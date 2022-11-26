
$(document).ready(function () {
    $.ajax({
        url: '../php/points/pointSession.php',//ubicacion del ponit
        method: 'GET',// metodo de envio
        responseType: 'json',//formato recibido
        async: false//hasta que termine la consulta no ejecuta el then

    }).then(function (data) {
        var dataRecive = JSON.parse(data);
        try {
            if (dataRecive["estado"] == "No session") {
                window.location.replace("index.html")
            } else {
                null;
            }
        } catch (error) {
            console.log(error, data);
        }
    });

    $.ajax({
        url: '../php/points/pointSession.php?info_session',
        method: 'GET',
        responseType: 'json',
        async: false
    }).then(function (data) {
        try {
            console.log(data)
            dataReciveUsuario = JSON.parse(data);
            /*console.log(dataReciveUsuario);
            /*console.log(dataReciveUsuario['usuarios'][0]['nombre']);*/
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
    var pEle = document.getElementById("pEl").textContent;
    var pDur = document.getElementById("pDu").textContent;
    var pCos = document.getElementById("pCo").textContent;

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

    if (pEle != "" && pDur != "" && pCos != "") {
        if (card != "" && date != "" && secCode != "" && name != "" && surname != "" && city != "" && country != "" && address != "" && postal != "" && phone != "") {
            $.ajax({
                url: '../php/points/pointPayment.php',//ubicacion del ponit
                method: 'POST',// metodo de envio
                responseType: 'json',//formato recibido
                data: {
                    tarjeta: card, fecha: date, codseg: secCode, nombre: name, apellido: surname,
                    ciudad: city, pais: country, direccion: address, codpostal: postal, telefono: phone
                },//informacion que envio en json
                async: false//hasta que termine la consulta no ejecuta el then
            }).then(function (data) {
                var div_log = document.getElementById("log_ingreso")
                try {
                    var dataRecive = JSON.parse(data);
                    if (true) { //variable placeholder, no se cual es la condición de éxito
                        Swal.fire({
                            icon: 'success',
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#012626",
                        });

                        div_log.innerHTML += `<label class="col-10" style="color: white;"> --> Ingreso Exitoso de - ${email} : estatus: ${dataRecive["estatus"]} - mensaje: ${dataRecive["Mensaje"]} - Nombre: ${dataRecive["data_usuario"]["usuario"]}</label><br>
                          `;
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'La información dada no es correcta',
                            confirmButtonColor: "#012626",
                        });
                        div_log.innerHTML += `<labelclass="col-10" style="color: red;"> --> Ingreso Fallido de - ${email} : Estatus ${dataRecive["estatus"]} - Mensaje ${dataRecive["Mensaje"]} </label><br>
                          `;
                    }

                } catch (error) {
                    console.log(data);
                    div_log.innerHTML += `<labelclass="col-10" style="color: red;"> ***** ERROR DE LOGICA 500 </label><br>`;
                }
            });


        }else {
            Swal.fire({
                icon: 'error',
                title: 'Plan no elegido',
                text: 'Por favor seleccione algún plan para continuar',
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Plan no elegido',
            text: 'Por favor seleccione algún plan para continuar',
        });
    }

}