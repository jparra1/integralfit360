
$("#login").click(function (e) {
    e.preventDefault();
    $("#btn-login").prop("checked", !$("#btn-login").prop("checked"));
});

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