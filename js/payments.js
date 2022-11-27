
$(document).ready(function () {
    $.ajax({
        url: '../php/points/pointSession.php?info_session',
        method: 'GET',
        responseType: 'json',
        async: false
    }).then(function (data) {
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

        try {
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
            console.log(error, data)
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

        let currentDate = `${year}-${month}-${day}`;

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