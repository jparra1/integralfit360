
$(document).ready(function () {
    try {
        const urlI = new URLSearchParams(window.location.search);
        document.getElementById("planElegido").textContent = urlI.get('E');
        document.getElementById("planDuracion").textContent = urlI.get('D');
        document.getElementById("planCosto").textContent = urlI.get('C');
    } catch (error) {
        null;
    }

})

function mediopago() {
    var pEle = document.getElementById("pEl").textContent;
    var pDur = document.getElementById("pDu").textContent;
    var pCos = document.getElementById("pCo").textContent;

    var card = document.getElementById("itarjeta").value;
    var date = document.getElementById("ifecha").value;
    var secCode = document.getElementById("icodigoseguridad").value;
    var name = document.getElementById("inputNombre").value;
    var surname = document.getElementById("inputApellidos").value;
    var city = document.getElementById("iciudad").value;
    var country = document.getElementById("ipais").value;
    var address = document.getElementById("idireccion").value;
    var postal = document.getElementById("ipostal").value;
    var phone = document.getElementById("itelefono").value;

    if (pEle != "" && pDur != "" && pCos != "") {
        if (card != "" && date != "" && secCode != "" && name != "" && surname != "" && city != "" && country != "" && address != "" && postal != "" && phone != "") {
            $.ajax({
                url: '../php/points/pointPayment.php',//ubicacion del ponit
                method: 'POST',// metodo de envio
                responseType: 'json',//formato recibido
                data: {
                    tarjeta: card, fecha: date, codseg: secCode, nombre: name, apellido: surname,
                    ciudad: city, pais: country, direccion: address, codpostal: postal, telefono: phone
                },//informacion que envio en json
                async: false//hasta que termine la consulta no ejecuta el then
            }).then(function (data) {
                var div_log = document.getElementById("log_ingreso")
                try {
                    var dataRecive = JSON.parse(data);
                    if (true) { //variable placeholder, no se cual es la condición de éxito
                        Swal.fire({
                            icon: 'success',
                            title: '',
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Plan no elegido',
            text: 'Por favor seleccione algún plan para continuar',
        });
    }

    
}

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