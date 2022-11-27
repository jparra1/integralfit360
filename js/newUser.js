
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
})