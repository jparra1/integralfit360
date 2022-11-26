
$(document).ready(function () {
    $.ajax({
        url: '../php/points/pointSession.php?info_session',
        method: 'GET',
        responseType: 'json',
        async: false
    }).then(function (data) {
        try {
            console.log(data)
            dataReciveUsuario = JSON.parse(data);
            if (dataReciveUsuario['estado'] == ("activo")) {
                if (dataReciveUsuario['info']['plan_adquirido'] != "") {
                    window.location.href = "mainUser.html";
                } else {
                    window.location.href = "newUser.html";
                }
            }
        } catch (error) {
            console.log(error, data)
        }
    })
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
                    console.log(data);
                    if (dataRecive["estatus"] =="Entrenador") {
                        window.location.replace("mainProfessional.html")                  
                    } else if (dataRecive["data_usuario"]["plan_adquirido"] == "") {
                        if (document.getElementById("pEl").textContent != "") {
                            window.location.href = "payment.html?E=" + document.getElementById("pEl").textContent + "&D=" + document.getElementById("pDu").textContent + "&C=" + document.getElementById("pCo").textContent;
                        } else {
                            window.location.href = "newUser.html";
                        }
                    }else{
                        window.location.href = "mainUser.html";
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
                console.log(error, data);
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