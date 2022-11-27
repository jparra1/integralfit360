var dataReciveSesiones;
var dataReciveUsuario;
var dataReciveProfesionales;
var dataReciveCitas;

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
    url:'../php/points/pointSession.php?info_session',
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      dataReciveUsuario = JSON.parse(data);
      /*console.log(dataReciveUsuario);
      /*console.log(dataReciveUsuario['usuarios'][0]['nombre']);*/
      document.getElementById("plan").textContent = dataReciveUsuario['info']['plan_adquirido'];
      document.getElementById("nombreUsuario").textContent = dataReciveUsuario['info']['nombre_usuario'] + " " + dataReciveUsuario['info']['apellido_usuario'];

      document.getElementById("inputNombre").textContent = dataReciveUsuario['info']['nombre_usuario'];
      document.getElementById("inputApellidos").textContent = dataReciveUsuario['info']['apellido_usuario'];
      document.getElementById("inputUsuario").textContent = dataReciveUsuario['info']['email_usuario'];
      document.getElementById("inputPeso").textContent = dataReciveUsuario['info']['peso_usuario'];
      document.getElementById("inputEstatura").textContent = dataReciveUsuario['info']['estatura_usuario'];
      document.getElementById("textAreaLimitaciones").textContent = dataReciveUsuario['info']['observaciones_usuario'];

      if (dataReciveUsuario['info']['plan_adquirido'] == "SPORT"){
        document.getElementById("nutricionistaDiv").hidden = true;
        document.getElementById("comida").hidden = true;
        document.getElementById("profesionalesNutricionista").hidden = true;
      }
      if (dataReciveUsuario['info']['plan_adquirido'] == "HEALTH"){
        document.getElementById("instructorDiv").hidden = true;
        document.getElementById("rutina").hidden = true;
        document.getElementById("profesionalesInstructor").hidden = true;
      }

      if (dataReciveUsuario['info']['plan_adquirido'] == "COMPLETE"){
        document.getElementById("citaAgendada").hidden = true;
        document.getElementById("profesionalesInstructor").hidden = true;
        document.getElementById("profesionalesNutricionista").hidden = true;
      }
    } catch (error){
      console.log(error)
    }
  })

  $.ajax({
    url:'../php/points/pointSDispo.php?sesiones_disponibles',
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      dataReciveSesiones = JSON.parse(data);
      /*console.log(dataReciveSesiones);*/
    } catch (error) {
      console.log(error)
    }
  })

  var divItemsInstructor = document.getElementById("accordionInstructor")
  var divItemsNutricionista = document.getElementById("accordionNutricionista")

  $.ajax({
    url:'../php/points/pointUsuarios.php?usuarios_360',
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      dataReciveProfesionales = JSON.parse(data);
      /*console.log(dataReciveProfesionales);
      /*console.log(dataRecive['usuarios'][0]['nombre']);*/
      dataReciveProfesionales['usuarios'].forEach(element => {
        dataReciveSesiones['sesiones'].forEach(sesion => {
          if (sesion.id_usario_interno == element.id_usuario && sesion.estado_sesion == "DISPONIBLE"){
            if (element.tipo_usuario == "SPORT"){
              divItemsInstructor.innerHTML += `<div class="accordion-item"><h2 class="accordion-header" id="heading${sesion.id_sesion}"> 
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${sesion.id_sesion}" aria-expanded="false" aria-controls="collapse${sesion.id_sesion}">
              <a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
              <p style="font-style: italic;">${element.nombre}</p> </button></h2>
              <div id="collapse${sesion.id_sesion}" class="accordion-collapse collapse" aria-labelledby="heading${sesion.id_sesion}" data-bs-parent="#accordionInstructor">
              <div class="accordion-body"><div class="row"><div class="col-lg-3" style="margin-left: 20px;"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Agendar cita</label>
              <div><p>${sesion.fecha_sesion}</p></div></div>
              <div class="col-lg-5" style="margin-left: 20px;"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Horarios disponibles</label>
              <div><p>${sesion.hora_sesion}</p></div></div><div class="col-lg-2"><p style="margin-top: 25px;">
              <a class="btn btn-info button5" role="button" id="agendarCita" onclick="agendarCita()">Agendar</a></p></div></div></div></div></div>
              <input type="hidden" id="sesion" value="${sesion.id_sesion}">`
            }
            if (element.tipo_usuario == "HEALTH"){
              divItemsNutricionista.innerHTML += `<div class="accordion-item"><h2 class="accordion-header" id="heading${sesion.id_sesion}"> 
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${sesion.id_sesion}" aria-expanded="false" aria-controls="collapse${sesion.id_sesion}">
              <a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
              <p style="font-style: italic;">${element.nombre}</p> </button></h2>
              <div id="collapse${sesion.id_sesion}" class="accordion-collapse collapse" aria-labelledby="heading${sesion.id_sesion}" data-bs-parent="#accordionNutricionista">
              <div class="accordion-body"><div class="row"><div class="col-lg-3" style="margin-left: 20px;"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Agendar cita</label>
              <div><p>${sesion.fecha_sesion}</p></div></div>
              <div class="col-lg-5" style="margin-left: 20px;"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Horarios disponibles</label>
              <div><p>${sesion.hora_sesion}</p></div></div><div class="col-lg-2"><p style="margin-top: 25px;">
              <a class="btn btn-info button5" role="button" id="agendarCita" onclick="agendarCita()">Agendar</a></p></div></div></div></div></div>
              <input type="hidden" id="sesion" value="${sesion.id_sesion}">`
            }
          }
        })
      });
    } catch (error){
      console.log(error)
    }
  })

  var divCitas = document.getElementById("modalCitas");
  $.ajax({
    url:'../php/points/pointAgenCita.php?id_usuario=' + dataReciveUsuario['info']['id_usuario'],
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      dataReciveCitas = JSON.parse(data);
      if (dataReciveCitas['estado'] == "Con sesiones"){
        dataReciveCitas['sesiones'].forEach(cita => {
          dataReciveSesiones['sesiones'].forEach(sesion => {
            if (cita.id_sesion == sesion.id_sesion){
              dataReciveProfesionales['usuarios'].forEach(element => {
                if (sesion.id_usario_interno == element.id_usuario){
                  divCitas.innerHTML += `<div class="row"><div class="col"><label>${sesion.hora_sesion}</label></div>
              <div class="col"><label>${sesion.fecha_sesion}</label></div>
              <div class="col"><label>${element.nombre}</label></div>
              <div class="col"><a href="${cita.url_sesion_meet}" target="_blank" style="text-decoration:none; color=: black">Ir a la sesion</a></div></div><hr>`
                }
              })
            }
          })
        })
      }else {
        divCitas.innerHTML += `<div>No hay citas agendadas</div>`
      }
    } catch (error) {
      console.log(error);
    }
  })

  var divRutinas = document.getElementById("entrenamiento");
  var divComida = document.getElementById("dieta1");
  var divComida2 = document.getElementById("dieta2");
  var divCita = document.getElementById("citaAgenda");
  var divProfesionalInstructor = document.getElementById("profesionalInstructor");
  var divProfesionalNutricionista = document.getElementById("profesionalNutricionista");

  $.ajax({
    url:'../php/points/pointAsignaciones.php?id_usuario=' + dataReciveUsuario['info']['id_usuario'],
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      var dataReciveAsignaciones = JSON.parse(data);
      console.log(dataReciveAsignaciones);
      if (dataReciveAsignaciones['estado'] == "Con sesiones"){
        dataReciveAsignaciones['sesiones'].forEach(sesion => {
          if (sesion.tipo_asignacion == "COMPLETE"){
            var rutinas = sesion.contenido1_asignacion.split(";");
            rutinas.forEach(rutina => {
              divRutinas.innerHTML += `<div class="col"><a><img src='${rutina}'></a><div>`
            })
            var comida = sesion.contenido2_asignacion.split(";")
            var receta = comida[2].replaceAll("\n", "<br>")
            divComida.innerHTML += `<div class="col text-center"><a><img src='${comida[0]}'></a></div>
            <div class="col"><button class="btn btn-info button2" style="font-weight: bold; font-size: 13px;" data-bs-toggle="modal" data-bs-target="#receta">Receta</button></div>`;
            divComida2.innerHTML += `<div class="col text-center"><p>${comida[1]}</p></div>
            <div class="col"></div> <div class="modal fade" id="receta" tabindex="-1" aria-labelledby="planes360Label" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="planes360Label" style="font-size: 25px; font-weight: bold; margin-left: 9px;">${comida[1]}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalReceta">
                    <div class="text-center"><a><img src='${comida[0]}'></a></div>
                    <br>
                    <div>${receta}</div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
          </div>`;
          }

          if (sesion.tipo_asignacion == "SPORT"){
            var rutinas = sesion.contenido1_asignacion.split(";");
            console.log(rutinas)
            rutinas.forEach(rutina => {
              divRutinas.innerHTML += `<div class="col"><a><img src='${rutina}'></a><div>`
            })

            dataReciveSesiones['sesiones'].forEach(sesion => {
              if (dataReciveCitas['sesiones'][0]['id_sesion'] == sesion.id_sesion){
                dataReciveProfesionales['usuarios'].forEach(profesional => {
                  if (sesion.id_usario_interno == profesional.id_usuario){
                    divCita.innerHTML += `<div><label>${sesion.fecha_sesion}</label><br><label>${sesion.hora_sesion}</label><br>
                    <a href="${dataReciveCitas['sesiones'][0]['url_sesion_meet']}" target="_blank">
                    <button class="btn btn-info button2" style="font-weight: bold; font-size: 13px;">Conectarme</button></a><div>`
                    divProfesionalInstructor.innerHTML += `<div class="col"><a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
                    ${profesional.nombre}</div>`
                  }
                })
              }
            })
          }

          if (sesion.tipo_asignacion == "HEALTH"){
            var comida = sesion.contenido2_asignacion.split(";")
            var receta = comida[2].replaceAll("\n", "<br>")
            divComida.innerHTML += `<div class="col text-center"><a><img src='${comida[0]}'></a></div>
            <div class="col"><button class="btn btn-info button2" style="font-weight: bold; font-size: 13px;" data-bs-toggle="modal" data-bs-target="#receta">Receta</button></div>`;
            divComida2.innerHTML += `<div class="col text-center"><p>${comida[1]}</p></div>
            <div class="col"></div> <div class="modal fade" id="receta" tabindex="-1" aria-labelledby="planes360Label" aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="planes360Label" style="font-size: 25px; font-weight: bold; margin-left: 9px;">${comida[1]}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="modalReceta">
                    <div class="text-center"><a><img src='${comida[0]}'></a></div>
                    <br>
                    <div>${receta}</div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
          </div>`;

            dataReciveSesiones['sesiones'].forEach(sesion => {
              if (dataReciveCitas['sesiones'][0]['id_sesion'] == sesion.id_sesion){
                dataReciveProfesionales['usuarios'].forEach(profesional => {
                  if (sesion.id_usario_interno == profesional.id_usuario){
                    divCita.innerHTML += `<div><label>${sesion.fecha_sesion}</label><br><label>${sesion.hora_sesion}</label><br>
                    <a href="${dataReciveCitas['sesiones'][0]['url_sesion_meet']}" target="_blank">
                    <button class="btn btn-info button2" style="font-weight: bold; font-size: 13px;">Conectarme</button></a><div>`
                    divProfesionalNutricionista.innerHTML += `<div class="col"><a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
                    ${profesional.nombre}</div>`
                  }
                })
              }
            })
          }
        })
      }else{
        console.log("no hay")
      }
    } catch (error) {
      console.log(error)
    }
  })
})

function agendarCita() {
  var id_sesion = document.getElementById("sesion").value;
  
  $.ajax({
    url: '../php/points/pointAgenCita.php',
    method: 'POST',
    responseType: 'json',
    data: {
      id_sesion: id_sesion, id_usuario: dataReciveUsuario['info']['id_usuario'],
      url_sesion_meet: "https://meet.google.com/fhn-cubu-qzg", estado_sesion: "AGENDADA"
    },
    async: false
  }).then(function (data) {
    try {
      var dataReciveCitaAgendada = JSON.parse(data);
      collapseInicio()
      Swal.fire({
        icon: 'success',
        title: 'Cita Agendada con éxito',
        confirmButtonText: "Entendido",
        confirmButtonColor: "#012626",
      });
    } catch (error) {
      console.log(error);
    }
  })

  $.ajax({
    url:'../php/points/pointAgenCita.php?id_usuario=' + dataReciveUsuario['info']['id_usuario'],
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      var dataReciveCitas = JSON.parse(data);
      /*console.log(dataReciveCitas)*/
      if (dataReciveCitas['estado'] == "Con sesiones"){
        dataReciveCitas['sesiones'].forEach(cita => {
          dataReciveSesiones['sesiones'].forEach(sesion => {
            if (cita.id_sesion == sesion.id_sesion){
              dataReciveProfesionales['usuarios'].forEach(element => {
                if (sesion.id_usario_interno == element.id_usuario){
                  divCitas.innerHTML += `<div class="row"><div class="col"><label>${sesion.hora_sesion}</label></div>
              <div class="col"><label>${sesion.fecha_sesion}</label></div>
              <div class="col"><label>${element.nombre}</label></div>
              <div class="col"><a href="${cita.url_sesion_meet}" target="_blank" style="text-decoration:none; color=: black">Ir a la sesion</a></div></div><hr>`
                }
              })
            }
          })
        })
      }else {
        divCitas.innerHTML += `<div>No hay citas agendadas</div>`
      }
    } catch (error) {
      console.log(error);
    }
  })
}

function collapseInicio(){
  document.getElementById("inicio").style.display = "block";
  document.getElementById("instructor").style.display = "none";
  document.getElementById("nutricionista").style.display = "none";

  document.getElementById("inicioButton").style.backgroundColor = "#012626";
  document.getElementById("instructorButton").style.backgroundColor = "#d9d9d9";
  document.getElementById("nutricionistaButton").style.backgroundColor = "#d9d9d9";

  document.getElementById("inicioButton").style.color = "white";
  document.getElementById("instructorButton").style.color = "black";
  document.getElementById("nutricionistaButton").style.color = "black";
}

function collapseInstructor(){
  document.getElementById("inicio").style.display = "none";
  document.getElementById("instructor").style.display = "block";
  document.getElementById("nutricionista").style.display = "none";

  document.getElementById("inicioButton").style.backgroundColor = "#d9d9d9";
  document.getElementById("instructorButton").style.backgroundColor = "#012626";
  document.getElementById("nutricionistaButton").style.backgroundColor = "#d9d9d9";

  document.getElementById("inicioButton").style.color = "black";
  document.getElementById("instructorButton").style.color = "white";
  document.getElementById("nutricionistaButton").style.color = "black";
}

function collapseNutricionista(){
  document.getElementById("inicio").style.display = "none";
  document.getElementById("instructor").style.display = "none";
  document.getElementById("nutricionista").style.display = "block";

  document.getElementById("inicioButton").style.backgroundColor = "#d9d9d9";
  document.getElementById("instructorButton").style.backgroundColor = "#d9d9d9";
  document.getElementById("nutricionistaButton").style.backgroundColor = "#012626";

  document.getElementById("inicioButton").style.color = "black";
  document.getElementById("instructorButton").style.color = "black";
  document.getElementById("nutricionistaButton").style.color = "white";
}