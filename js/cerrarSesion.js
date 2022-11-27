function cerrarSesion(){
    $.ajax({
        url: '../php/points/pointSession.php?close_session',//ubicacion del ponit
        method: 'GET',// metodo de envio
        responseType: 'json',//formato recibido
        async: false//hasta que termine la consulta no ejecuta el then

    }).then(function (data) {
        location.reload()
    });
  }