
$(document).ready(function () {
    $.ajax({
        url: '../php/points/pointSession.php?info_session',//ubicacion del ponit
        method: 'GET',// metodo de envio
        responseType: 'json',//formato recibido
        async: false//hasta que termine la consulta no ejecuta el then

    }).then(function (data) {
        console.log(data);
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
        dataReciveUsuario = JSON.parse(data);

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