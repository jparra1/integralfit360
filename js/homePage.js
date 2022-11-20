
$(document).ready(function () {
    
})

function ingresar() {
   
    var email = document.getElementById("correoUsuario").value;
    var passw = document.getElementById("password").value;

    if (email != "" && passw != "") {
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
                    window.location.replace("payment.html")                  
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
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Ingrese las credenciales',
            text: 'Por favor digite el correo y la contraseña de su cuenta',
            confirmButtonColor: "#012626",
          });
    }

}

function registrar() {

    var idtype = document.getElementById("inputTipoDocumentoIdentidad").value;
    var id = document.getElementById("inputNumeroIdentidad").value;
    var name = document.getElementById("inputNombre").value;
    var surname = document.getElementById("inputApellidos").value;
    var email = document.getElementById("inputUsuario").value;
    var pass = document.getElementById("inputPassword").value;
    var weight = document.getElementById("inputPeso").value;
    var age = document.getElementById("inputEdad").value;
    var gender = document.getElementById("inputGenero").value;
    var special = document.getElementById("textAreaLimitaciones").value;

    if (idtype != "" && id != "" && name != "" && surname != "" && email != "" && pass != "" && weight != "" && age != "" && gender != "") {
        
        $.ajax({
            url: '../php/points/pointRegistro.php',
            method: 'POST',
            responseType: 'json',
            data: {
                email_usuario: email, password_usuario: pass, nombre_usuario: name, apellido_usuario: surname,
                edad_usuario: age, genero_usuario: gender, peso_usuario: weight, estatura_usuario: '0',
                observaciones_usuario: special
            },
            async: false
        }).then(function (data) {
            try {
                var dataRecive = JSON.parse(data);
                if (dataRecive["usuario"] == "Registrado") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro completado',
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#012626",
                    });
                    $('#registrarse').modal('hide');
                    $('#login').modal('show');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'Existen problemas con la información dada',
                        confirmButtonColor: "#012626",
                    });
                }

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: data,
                    confirmButtonColor: "#012626",
                });
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Llene todos los campos',
            text: 'Por favor digite información en todos los campos requeridos',
            confirmButtonColor: "#012626",
        });
    }
}

function enviar() {
    window.location.replace("payment.html?E=" + document.getElementById("pEl").textContent + "&D=" + document.getElementById("pDu").textContent + "&C=" + document.getElementById("pCo").textContent);
}
