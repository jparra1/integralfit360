$(document).ready(function() {
  $.ajax({
    url:'../php/points/pointSession.php?info_session',
    method:'GET',
    responseType:'json',
    async: false
  }).then(function(data){
    try {
      var dataRecive = JSON.parse(data);
      document.getElementById("plan").textContent = dataRecive['info']['plan_adquirido'];
      document.getElementById("nombreUsuario").textContent = dataRecive['info']['nombre_usuario'] + " " + dataRecive['info']['apellido_usuario'];

      document.getElementById("inputNombre").textContent = dataRecive['info']['nombre_usuario'];
      document.getElementById("inputApellidos").textContent = dataRecive['info']['apellido_usuario'];
      document.getElementById("inputUsuario").textContent = dataRecive['info']['email_usuario'];
      document.getElementById("inputPeso").textContent = dataRecive['info']['peso_usuario'];
      document.getElementById("inputEstatura").textContent = dataRecive['info']['estatura_usuario'];
      document.getElementById("textAreaLimitaciones").textContent = dataRecive['info']['observaciones_usuario'];

      if (dataRecive['info']['plan_adquirido'] == "SPORT"){
        document.getElementById("nutricionistaDiv").hidden = true;
        document.getElementById("comida").hidden = true;
      }
      if (dataRecive['info']['plan_adquirido'] == "HEALTH"){
        document.getElementById("instructorDiv").hidden = true;
        document.getElementById("rutina").hidden = true;
      }
    } catch (error){
      console.log("error")
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
      var dataRecive = JSON.parse(data);
      dataRecive['usuarios'].forEach(element => {
        if (element.tipo_usuario == "Entrenador"){
          divItemsInstructor.innerHTML += `<div class="accordion-item"><h2 class="accordion-header" id="headingOne"> 
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          <a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
          <p style="font-style: italic;">${element.nombre}</p> </button></h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionInstructor">
          <div class="accordion-body"><div class="row"><div class="col-lg-3"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Agendar cita</label>
          <input id="ifecha" type="date" class="form-select text-center" style="margin-bottom: 16px; " required=""></div>
          <div class="col-lg-5" style="margin-left: 20px;"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Horarios disponibles</label>
          <div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">9:00 am</label></div></div><div class="col-lg-2"><p style="margin-top: 25px;">
          <a class="btn btn-info button5" href="" role="button" id="agendarCita">Agendar</a></p></div></div></div></div></div>`
        }
        if (element.tipo_usuario == "Nutricionista"){
          divItemsNutricionista.innerHTML += `<div class="accordion-item"><h2 class="accordion-header" id="headingOne"> 
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          <a><img src="../images/perfil-de-usuario.webp" style="width: 80px; height: 80px; border-radius: 40px; margin-right: 30px;"></a>
          <p style="font-style: italic;">${element.nombre}</p> </button></h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionNutricionista">
          <div class="accordion-body"><div class="row"><div class="col-lg-3"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Agendar cita</label>
          <input id="ifecha" type="date" class="form-select text-center" style="margin-bottom: 16px; " required=""></div>
          <div class="col-lg-5" style="margin-left: 20px;"><label style="margin-bottom: 16px; margin-top: 16px; font-size: 15px; font-weight: bold;" class="col-lg-8">Horarios disponibles</label>
          <div class="form-check"><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">9:00 am</label></div></div><div class="col-lg-2"><p style="margin-top: 25px;">
          <a class="btn btn-info button5" href="" role="button" id="agendarCita">Agendar</a></p></div></div></div></div></div>`
        }

      });
    } catch (error){
      console.log("error")
    }
  })
})

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