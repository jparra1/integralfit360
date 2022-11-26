var dataReciveSesiones;
var dataReciveUsuario;
var dataReciveProfesionales;

$(document).ready(function() {
  $.ajax({
    url:'../php/points/pointSession.php?info_session',
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      console.log(data)
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
      }
      if (dataReciveUsuario['info']['plan_adquirido'] == "HEALTH"){
        document.getElementById("instructorDiv").hidden = true;
        document.getElementById("rutina").hidden = true;
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
      console.log(dataReciveSesiones);
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
      console.log(dataReciveProfesionales);
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
      var dataReciveCitas = JSON.parse(data);
      console.log(dataReciveCitas)
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