
var citasDisponibles=[];
var citasAsignadas=[];
var usuarios_internos=[];
var usuarios_clientes=[];
var tareasAsignadas=[];
var dataRecive=[];
var pacientes;
var historialCitas;
$(document).ready(function () {
  $.ajax({
    url: '../php/points/pointSession.php?info_session',//ubicacion del ponit
    method: 'GET',// metodo de envio
    responseType: 'json',//formato recibido
    async: false//hasta que termine la consulta no ejecuta el then

  }).then(function (data) {
      dataRecive = JSON.parse(data);
      try {
          if (dataRecive["estado"] == "No session") {
              window.location.replace("index.html")
          } else {
              document.getElementById("nombreUsuario").innerHTML=dataRecive["info"]["nombre"]
              document.getElementById("foto_entrenador").innerHTML=`<img src="${"../images/"+dataRecive["info"]["id_usuario"]+"_user.png"}" style="width: 150px; height: 150px; border-radius: 75px;" >`
              if (dataRecive["info"]["tipo_usuario"]=="SPORT") {
                document.getElementById("SPORT").style.display="flex"
              } else if(dataRecive["info"]["tipo_usuario"]=="HEALTH"){
                document.getElementById("HEALTH").style.display="flex"
              }else if(dataRecive["info"]["tipo_usuario"]=="COMPLETE"){
                document.getElementById("SPORT").style.display="flex"
                document.getElementById("HEALTH").style.display="flex"
              }
          }
      } catch (error) {
          console.log(error, data);
      }
  });
  citasDisponiblesF();
  citasAsignadasF()
  tareasAsignadasF();
  usuariosinternosF();
  usuariosclientesF();

  loadUsersInstructive();
  
})
function loadUsersInstructive() {
  var contentHistorialCitas=document.getElementById("contentHistorias")
  var infos_usuario=[]
  var index = 1
  citasDisponibles["sesiones"].forEach(element => {
    var infoUsuario="";
    var info_sesion=[]
    if (element["estado_sesion"]=="ASIGNADA") {
      
      info_sesion = citasAsignadas["sesiones"].find(x => x["id_sesion"] == element["id_sesion"])
      if(info_sesion){
        infoUsuario = usuarios_clientes["usuarios_clientes"].find(x => x.id_usuario == info_sesion["id_usuario"])
        if (infos_usuario.length>0) {
          if (!infos_usuario.find(x => x["id_usuario"] == info_sesion["id_usuario"])) {
            infos_usuario.push(infoUsuario);
          }
        }else{
          infos_usuario.push(infoUsuario);
        }
        
      }
    }
    contentHistorialCitas.innerHTML+=`
    <div style="background-color: rgb(235, 235, 235); padding: 10px;  border-radius: 50px;margin-top: 20px;" class="col-md-12 col-5 mx-auto">
      <label class="col-lg-1 col-md-1 col-10 mx-auto text-sm-center text-star" style="padding-left: 10px;">${index}</label>
      <label class="col-lg-3 col-md-2 col-10 mx-auto text-sm-center text-star" style="padding-left: 10px;">${infoUsuario!=""?infoUsuario["nombre_usuario"]+" "+infoUsuario["apellido_usuario"]:"No Asignado"}</label>
      <label class="col-lg-2 col-md-2 col-10 mx-auto text-sm-center text-star" style="padding-left: 10px;">${element["estado_sesion"]}</label>
      <label class="col-lg-2 col-md-2 col-10 mx-auto text-sm-center text-star" style="padding-left: 10px;">${element["fecha_sesion"]}</label>
      <label class="col-lg-2 col-md-2 col-10 mx-auto text-sm-center text-star" style="padding-left: 10px;">${element["hora_sesion"]}</label>
      <label class="col-lg-1 col-md-1 col-10 mx-auto text-sm-end text-star" style="padding-left: 10px;"><a href="${info_sesion["url_sesion_meet"]}" target="_blank" rel="noopener noreferrer">Link</a></label>
    </div>`
    index++
  });
  var contentUsuariosPacientes=document.getElementById("contentUsuarios")
  if (infos_usuario.length>0) {
      infos_usuario.forEach(element => {
            contentUsuariosPacientes.innerHTML+=`<div style="background-color: #04BFBF; height: 100px; padding: 10px;margin-top:10px;  border-radius: 50px;" class="col-0 mx-auto">
            <div class="row">
              <div class="col-3">
                <a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
              </div>
              <div class="col-lg-4 col-5">
                <div class="row" style="padding-top: 5px;">
                  <div class="col-12">
                    <label style="font-weight: bold;">Nombre: ${element["nombre_usuario"]+" "+element["apellido_usuario"]}</label>
                  </div>
                </div>
                <div class="row" id="nombre">
                    <label>Plan: ${element["plan_adquirido"]==""?"Sin Plan":element["plan_adquirido"]}</label>
                </div>
              </div>
              <div class="col-3 text-center my-auto">
                <button class="buttonHistory" type="submit" onclick="asignarTareas('${element["plan_adquirido"]==""?"0":element["id_usuario"]}')">Asignar</button>
              </div>
            </div>
          </div>`
      });  
  }else{
    contentUsuariosPacientes.innerHTML="No hay pacientes"
  }

}
function asignarTareas(id_usuario) {
  if (id_usuario == "0") {
    $('#asignacion').modal('hide')
    Swal.fire({
      icon: 'error',
      title: 'No valido',
      text: 'No se puede asignar tareas a este usuario debido a que no tiene un plan adquirido',
      confirmButtonColor: "#012626",
  });
  }else{
    $('#asignacion').modal('show')
    document.getElementById("crearAsignacion").value=id_usuario
  }
}

function formatoFecha(fecha, formato) {
  const map = {
      dd: fecha.getDate(),
      mm: fecha.getMonth() + 1,
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
  }

  return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
}

function crearAsignacion() {
  var asingacion1=document.getElementById("Asignacion_Deportiva").value;
  var asingacion2=document.getElementById("Asignacion_Alimentaria").value;
  var recomendaciones=document.getElementById("Asignacion_Recomendaciones").value;
  const fechahoy = new Date();
  hoy =formatoFecha(fechahoy,"yyyy-mm-dd")
  if ((asingacion1 != "" || asingacion2 != "") != "" && recomendaciones != "" ){
      $.ajax({
        url: '../php/points/pointAsignaciones.php',
        method: 'POST',
        responseType: 'json',
        data: {
          id_usuario_asignado:document.getElementById("crearAsignacion").value,
          tipo_asignacion:dataRecive["info"]["tipo_usuario"],
          id_user_interno: dataRecive["info"]["id_usuario"],
          contenido1_asignacion: asingacion1,
          contenido2_asignacion: asingacion2,
          comentarios_asignacion:recomendaciones,
          estado_asignacion:"ASIGNADA",
          fecha_asignacion:hoy
        },
        async: false
      }).then(function (data) {
        try {
          var data = JSON.parse(data);
          if (data.asignacion=="realizada") {
            $('#asignacion').modal('hide')
            Swal.fire({
              icon: 'success',
              title: 'Se asignaron las recomendaciones con exito',
              confirmButtonText: "Entendido",
              confirmButtonColor: "#012626",
            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'No valido',
              text: 'Error al intentar asignar',
              confirmButtonColor: "#012626",
            });
          }

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'No valido',
            text: 'Error interno',
            confirmButtonColor: "#012626",
          });
          console.log(error,data);
        }
      })
  }else{
    Swal.fire({
      icon: 'error',
      title: 'No valido',
      text: 'Debe llenar los campos correctamente',
      confirmButtonColor: "#012626",
    });
  }

}

function usuariosinternosF() {
  $.ajax({
    url: '../php/points/pointUsuarios.php?usuarios_360',
    method: 'GET',
    responseType: 'json',
    async: false
  }).then(function (data) {
      try {
          usuarios_internos = JSON.parse(data);
      } catch (error) {
          console.log(error, data)
      }
  })
}

function usuariosclientesF() {
  $.ajax({
    url: '../php/points/pointUsuarios.php?usuarios_clientes',
    method: 'GET',
    responseType: 'json',
    async: false
  }).then(function (data) {
      try {
          usuarios_clientes = JSON.parse(data);
      } catch (error) {
          console.log(error, data)
      }
  })
}
function citasDisponiblesF() {
  $.ajax({
    url: '../php/points/pointSDispo.php?id_usuario_interno='+dataRecive["info"]["id_usuario"],
    method: 'GET',
    responseType: 'json',
    async: false
  }).then(function (data) {
      try {
          citasDisponibles = JSON.parse(data);
      } catch (error) {
          console.log(error, data)
      }
  })
}
function citasAsignadasF() {
  $.ajax({
    url: '../php/points/pointAgenCita.php?id_usuario_interno='+dataRecive["info"]["id_usuario"],
    method: 'GET',
    responseType: 'json',
    async: false
  }).then(function (data) {
      try {
          citasAsignadas = JSON.parse(data);
      } catch (error) {
          console.log(error, data)
      }
  })
}
function tareasAsignadasF() {
  $.ajax({
    url: '../php/points/pointAsignaciones.php',
    method: 'GET',
    responseType: 'json',
    async: false
  }).then(function (data) {
      try {
          tareasAsignadas = JSON.parse(data);
      } catch (error) {
          console.log(error, data)
      }
  })
}

function crearSesión() {

  var titulo= document.getElementById("tituloSesion").value
  var fecha= document.getElementById("fechaSesion").value
  var hora= document.getElementById("horaSesion").value

  if(titulo != "" && fecha != "" && hora != ""){
    $.ajax({
      url: '../php/points/pointSDispo.php',
      method: 'POST',
      data:{
        nueva_sesion:"",
        id_usuario_interno:dataRecive["info"]["id_usuario"],
        titulo_sesion:titulo,
        estado_sesion:"DISPONIBLE",
        hora_sesion:hora,
        fecha_sesion:fecha,
      },
      responseType: 'json',
      async: false
    }).then(function (data) {
        try {
            var dataCita = JSON.parse(data)
            if (dataCita["sesion"]=="Creada") {
              $('#nuevaCita').modal('hide')
              Swal.fire({
                icon: 'success',
                title: 'Se ha creado con exito con exito',
                confirmButtonText: "Entendido",
                confirmButtonColor: "#012626",
              });
              setTimeout(function(){location.reload()},800);

            }else{
              Swal.fire({
                icon: 'error',
                title: 'No Creada',
                text: 'Error interno',
                confirmButtonColor: "#012626",
              });
            }
            tareasAsignadas = JSON.parse(data);
        } catch (error) {
            console.log(error, data)
        }
    })
  }

}

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