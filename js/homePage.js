
function ingresar() {
    var email=document.getElementById("correoUsuario").value;
    var pass=document.getElementById("password").value;
    if (email != "" && pass != ""){
        $.ajax({
            url:'../php/points/pointLogin.php',//ubicacion del ponit
            method:'POST',// metodo de envio
            responseType:'json',//formato recibido
            data:{usuario:email,contraseña:pass},//informacion que envio en json
            async:false//hasta que termine la consulta no ejecuta el then
        }).then(function(data){
                var div_log=document.getElementById("log_ingreso")
                try {
                    var dataRecive = JSON.parse(data);
                    if(dataRecive["usuario"]=="Existente"){
                        Swal.fire({
                            icon: 'success',
                            title: 'Credenciales correctas',
                            confirmButtonText:"Entendido",
                            text: '',
                          });
                        
                          div_log.innerHTML+=`<label class="col-10" style="color: white;"> --> Ingreso Exitoso de - ${email} : estatus: ${dataRecive["estatus"]} - mensaje: ${dataRecive["Mensaje"]} - Nombre: ${dataRecive["data_usuario"]["usuario"]}</label><br>
                          `;
                          document.getElementById("correoUsuario").value="";
                          document.getElementById("password").value="";
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'Por favor, ingrese las credenciales correctas.',
                          });
                          div_log.innerHTML+=`<labelclass="col-10" style="color: red;"> --> Ingreso Fallido de - ${email} : Estatus ${dataRecive["estatus"]} - Mensaje ${dataRecive["Mensaje"]} </label><br>
                          `;
                    }

                } catch (error) {
                    console.log(data);
                    div_log.innerHTML+=`<labelclass="col-10" style="color: red;"> ***** ERROR DE LOGICA 500 </label><br>`;
                }
        });

        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Opss...',
            text: 'Ingrese las credenciales',
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
    var height = document.getElementById("inputAltura").value;
    var age = document.getElementById("inputEdad").value;
    var gender = document.getElementById("inputGenero").value;
    var special = document.getElementById("textAreaLimitaciones").value;

    if (idtype != "" && id != "" && name != "" && surname != "" && email != "" && pass != "" && height != "" && age != "" && gender != "") {
        $.ajax({
            url: '../php/points/pointRegister.php',//ubicacion del ponit
            method: 'POST',// metodo de envio
            responseType: 'json',//formato recibido
            data: {
                tipoDocumento: idtype, documento: id, nombre: name, apellido: surname, usuario: email, contraseña: pass,
                altura: height, edad: age, genero: gender, especial: special
            },//informacion que envio en json
            async: false//hasta que termine la consulta no ejecuta el then
        }).then(function (data) {
            var div_log = document.getElementById("log_ingreso")
            try {
                var dataRecive = JSON.parse(data);
                if (dataRecive["usuario"] == "NoExistente") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro completado',
                        confirmButtonText: "Entendido",
                        text: '',
                    });

                    div_log.innerHTML += `<label class="col-10" style="color: white;"> --> Ingreso Exitoso de - ${email} : estatus: ${dataRecive["estatus"]} - mensaje: ${dataRecive["Mensaje"]} - Nombre: ${dataRecive["data_usuario"]["usuario"]}</label><br>
                          `;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'La información dada no es correcta',
                    });
                    div_log.innerHTML += `<labelclass="col-10" style="color: red;"> --> Ingreso Fallido de - ${email} : Estatus ${dataRecive["estatus"]} - Mensaje ${dataRecive["Mensaje"]} </label><br>
                          `;
                }

            } catch (error) {
                console.log(data);
                div_log.innerHTML += `<labelclass="col-10" style="color: red;"> ***** ERROR DE LOGICA 500 </label><br>`;
            }
        });


    }
}

function enviar() {
    window.location.replace("payment.html?E=" + document.getElementById("pEl").textContent + "&D=" + document.getElementById("pDu").textContent + "&C=" + document.getElementById("pCo").textContent);
}
