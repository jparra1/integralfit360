

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
})
function collapseUsuario(){
  document.getElementById("usuario").style.display = "block";
  document.getElementById("citas").style.display = "none";

  document.getElementById("usuarioButton").style.backgroundColor = "#d9d9d9";
  document.getElementById("citasButton").style.backgroundColor = "#012626";

  document.getElementById("usuarioButton").style.color = "black";
  document.getElementById("citasButton").style.color = "white"
}

function collapseCitas(){
  document.getElementById("usuario").style.display = "none";
  document.getElementById("citas").style.display = "block";

  document.getElementById("usuarioButton").style.backgroundColor = "#012626";
  document.getElementById("citasButton").style.backgroundColor = "#d9d9d9";

  document.getElementById("usuarioButton").style.color = "white";
  document.getElementById("citasButton").style.color = "black"
}