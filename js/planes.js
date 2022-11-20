
function selectS(button, price, duration) {
    limpiar();

    document.getElementById("pEl").textContent = "Plan Sport";
    document.getElementById("pDu").textContent = price;
    document.getElementById("pCo").textContent = duration;
    document.getElementById("pSport").textContent = price;

    button.className = "btn btn-info button3"
    button.style = "background-color: #012626; font-weight: bold; font-size: 10px;  width: 70px"
}

function selectH(button, price, duration) {
    limpiar();

    document.getElementById("pEl").textContent = "Plan Health";
    document.getElementById("pDu").textContent = price;
    document.getElementById("pCo").textContent = duration;
    document.getElementById("pHealth").textContent = price;

    button.className = "btn btn-info button3"
    button.style = "background-color: #012626; font-weight: bold; font-size: 10px;  width: 70px"
}

function selectC(button, price, duration) {
    limpiar();

    document.getElementById("pEl").textContent = "Plan Complete";
    document.getElementById("pDu").textContent = price;
    document.getElementById("pCo").textContent = duration;
    document.getElementById("pComplete").textContent = price;

    button.className = "btn btn-info button3"
    button.style = "background-color: #012626; font-weight: bold; font-size: 10px;  width: 70px"
}

function changeR() {
    document.getElementById("planElegido").textContent = document.getElementById("pEl").textContent;
    document.getElementById("planDuracion").textContent = document.getElementById("pDu").textContent;
    document.getElementById("planCosto").textContent = document.getElementById("pCo").textContent;
}

function limpiar() {
    document.getElementById("pSport").textContent = "";
    document.getElementById("pHealth").textContent = "";
    document.getElementById("pComplete").textContent = "";

    document.getElementById("bs1").className = "btn btn-info button2"
    document.getElementById("bs1").style = "font-weight: bold; font-size: 10px; width: 70px"
    document.getElementById("bs2").className = "btn btn-info button2"
    document.getElementById("bs2").style = "font-weight: bold; font-size: 10px; width: 70px"
    document.getElementById("bs3").className = "btn btn-info button2"
    document.getElementById("bs3").style = "font-weight: bold; font-size: 10px; width: 70px"

    document.getElementById("bh1").className = "btn btn-info button2"
    document.getElementById("bh1").style = "font-weight: bold; font-size: 10px; width: 70px"
    document.getElementById("bh2").className = "btn btn-info button2"
    document.getElementById("bh2").style = "font-weight: bold; font-size: 10px; width: 70px"
    document.getElementById("bh3").className = "btn btn-info button2"
    document.getElementById("bh3").style = "font-weight: bold; font-size: 10px; width: 70px"

    document.getElementById("bc1").className = "btn btn-info button2"
    document.getElementById("bc1").style = "font-weight: bold; font-size: 10px; width: 70px"
    document.getElementById("bc2").className = "btn btn-info button2"
    document.getElementById("bc2").style = "font-weight: bold; font-size: 10px; width: 70px"
    document.getElementById("bc3").className = "btn btn-info button2"
    document.getElementById("bc3").style = "font-weight: bold; font-size: 10px; width: 70px"
}
