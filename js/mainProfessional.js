

$(document).ready(function () {
  $.ajax({
    url:'../php/points/pointLogin.php',//ubicacion del ponit
    method:'POST',// metodo de envio
    responseType:'json',//formato recibido
    data: { email_usuario: email, password_usuario: passw},//informacion que envio en json
    async: false//hasta que termine la consulta no ejecuta el then

}).then(function (data) {
    try {
        var dataRecive = JSON.parse(data);
        if (dataRecive["usuario"] == "Existente") {
            //aun falta revisar bien que hace al ingresar
            document.getElementById("correoUsuario").value = "";
            document.getElementById("password").value = "";
            console.log(data);
            if (dataRecive["estatus"] =="Entrenador") {
                window.location.replace("mainProfessional.html")                  
            }else if(dataRecive["data_usuario"]["tipo_usuario"]==""){
                window.location.replace("payment.html")
            }else{
                window.location.replace("mainUser.html")
            }

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Revise las credenciales',
                text: 'El correo o la contraseña no son correctos',
                confirmButtonColor: "#012626",
                });
        }
    } catch (error) {
        null;
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