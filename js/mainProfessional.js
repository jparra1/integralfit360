
function collapseUsuario(){
  document.getElementById("usuario").style.display = "block";
  document.getElementById("citas").style.display = "none";

  document.getElementById("usuarioButton").style.backgroundColor = "#012626";
  document.getElementById("citasButton").style.backgroundColor = "#d9d9d9";

  document.getElementById("usuarioButton").style.color = "white";
  document.getElementById("citasButton").style.color = "black"
}

function collapseCitas(){
  document.getElementById("usuario").style.display = "none";
  document.getElementById("citas").style.display = "block";

  document.getElementById("usuarioButton").style.backgroundColor = "#d9d9d9";
  document.getElementById("citasButton").style.backgroundColor = "#012626";

  document.getElementById("usuarioButton").style.color = "black";
  document.getElementById("citasButton").style.color = "white"
}