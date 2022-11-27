
$(document).ready(function () {
    $.ajax({
        url: '../php/points/pointSession.php?info_session',
        method: 'GET',
        responseType: 'json',
        async: false
    }).then(function (data) {
        try {
            dataReciveUsuario = JSON.parse(data);

            try {
                if (dataReciveUsuario["estado"] == "No session") {
                    window.location.href = "index.html";
                } else {
                    null;
                }
            } catch (error) {
                console.log(error, data);
            }

            document.getElementById("plan").textContent = dataReciveUsuario['info']['plan_adquirido'];

            document.getElementById("iNombre").textContent = dataReciveUsuario['info']['nombre_usuario'];
            document.getElementById("iApellidos").textContent = dataReciveUsuario['info']['apellido_usuario'];
            document.getElementById("iUsuario").textContent = dataReciveUsuario['info']['email_usuario'];
            document.getElementById("iPeso").textContent = dataReciveUsuario['info']['peso_usuario'];
            document.getElementById("iEstatura").textContent = dataReciveUsuario['info']['estatura_usuario'];
            document.getElementById("textLimitaciones").textContent = dataReciveUsuario['info']['observaciones_usuario'];

            if (dataReciveUsuario['info']['plan_adquirido'] == "SPORT") {
                document.getElementById("nutricionistaDiv").hidden = true;
                document.getElementById("comida").hidden = true;
            }
            if (dataReciveUsuario['info']['plan_adquirido'] == "HEALTH") {
                document.getElementById("instructorDiv").hidden = true;
                document.getElementById("rutina").hidden = true;
            }
        } catch (error) {
            console.log(error)
        }
    })

    var divCitas = document.getElementById("modalCitas");
    $.ajax({
        url: '../php/points/pointAgenCita.php?id_usuario=' + dataReciveUsuario['info']['id_usuario'],
        method: 'GET',
        responseType: 'json',
        async: false
    }).then(function (data) {
        try {
            var dataReciveCitas = JSON.parse(data);
            console.log(dataReciveCitas)
            if (dataReciveCitas['estado'] == "Con sesiones") {
                dataReciveCitas['sesiones'].forEach(cita => {
                    dataReciveSesiones['sesiones'].forEach(sesion => {
                        if (cita.id_sesion == sesion.id_sesion) {
                            dataReciveProfesionales['usuarios'].forEach(element => {
                                if (sesion.id_usario_interno == element.id_usuario) {
                                    divCitas.innerHTML += `<div class="row"><div class="col"><label>${sesion.hora_sesion}</label></div>
              <div class="col"><label>${sesion.fecha_sesion}</label></div>
              <div class="col"><label>${element.nombre}</label></div>
              <div class="col"><a href="${cita.url_sesion_meet}" target="_blank" style="text-decoration:none; color=: black">Ir a la sesion</a></div></div><hr>`
                                }
                            })
                        }
                    })
                })
            } else {
                divCitas.innerHTML += `<div>No hay citas agendadas</div>`
            }
        } catch (error) {
            console.log(error);
        }
    })

    try {
        const urlI = new URLSearchParams(window.location.search);
        document.getElementById("planElegido").textContent = urlI.get('E');
        document.getElementById("planDuracion").textContent = urlI.get('D');
        document.getElementById("planCosto").textContent = urlI.get('C');
    } catch (error) {
        console.log(error, data);
    }
})

function mediopago() {
    var pEle = document.getElementById("planElegido").textContent;
    var pDur = document.getElementById("planDuracion").textContent;
    var pCos = document.getElementById("planCosto").textContent;

    try {
        var card = document.getElementById("itarjeta").value;
        var date = document.getElementById("ifecha").value;
        var secCode = document.getElementById("icodigoseguridad").value;
        var name = document.getElementById("inputNombre").value;
        var surname = document.getElementById("inputApellidos").value;
        var city = document.getElementById("iciudad").value;
        var country = document.getElementById("ipais").value;
        var address = document.getElementById("idireccion").value;
        var postal = document.getElementById("ipostal").value;
        var phone = document.getElementById("itelefono").value;
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Información incompleta',
            text: 'Por favor complete toda la información para continuar',
            confirmButtonColor: "#012626",
        });
    }

    $.ajax({
        url: '../php/points/pointSession.php?info_session',
        method: 'GET',
        responseType: 'json',
        async: false
    }).then(function (data) {
        try {
            var id = dataReciveUsuario['info']['id_usuario'];
        } catch (error) {
            console.log(error);
        }

        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}-${month}-${year}`;

        if (pEle != "" && pDur != "" && pCos != "") {
            if (id != "") {
                $.ajax({
                    url: '../php/points/pointPagos.php',
                    method: 'POST',
                    responseType: 'json',
                    data: { id_usuario: id, tiempo_comprado: pDur, tipo_plan: pEle, fecha_pago: currentDate},
                    async: false
                }).then(function (data) {
                    try {
                        var dataReceive = JSON.parse(data);
                        if (dataReceive["usuario"] == "Registrado") { //variable placeholder, no se cual es la condición de éxito
                            Swal.fire({
                                icon: 'success',
                                confirmButtonText: "Entendido",
                                title: 'Plan adquirido',
                                confirmButtonColor: "#012626",
                                
                            }).then(function () { window.location.href = "mainUser.html";})
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Hubo un error',
                                text: 'La información dada no es correcta',
                                confirmButtonColor: "#012626",
                            });
                        }
                    } catch (error) {
                        console.log(data, error);
                    }
                });


            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocurrió un error',
                    confirmButtonColor: "#012626",
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Plan no elegido',
                text: 'Por favor seleccione algún plan para continuar',
                confirmButtonColor: "#012626",
            });
        }
    })

    

}