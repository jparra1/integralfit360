function cerrarSesion(){
    $.ajax({
        url: '../php/points/pointSession.php?close_session',//ubicacion del ponit
        method: 'GET',// metodo de envio
        responseType: 'json',//formato recibido
        async: false//hasta que termine la consulta no ejecuta el then

    }).then(function (data) {
        var dataRecive = JSON.parse(data);
        try {
            if (dataRecive["estado"] == "Session Cerrada") {
                window.location.href="index.html"
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error, data);
        }
    });
  }