document.addEventListener("DOMContentLoaded", getData);

const mas = document.querySelector(".mas"); 
const menos = document.querySelector(".menos");
const contador = document.querySelector(".contador");
const unidad = document.querySelector(".valorUnidad");
const total = document.querySelector(".valorTotal");
const totalCarrito = document.querySelector(".right"); 

let valorContador = 0;
const valorUnidad = parseFloat(unidad.textContent.replace('€', '').replace(',', '.'));

function botonMas() {
    valorContador++;
    actualizarContador();
    actualizarTotal();
}

function botonMenos() {
    if (valorContador > 0) { 
        valorContador--;
    }
    actualizarContador();
    actualizarTotal();
}

function actualizarContador() {
    contador.innerHTML = valorContador;
}

function actualizarTotal () {
    total.innerHTML = (valorContador * valorUnidad).toFixed(2) + "€";
    totalCarrito.innerHTML = parseFloat(total.textContent.replace('€', '').replace(',', '.')) + "€";
}

mas.addEventListener("click", botonMas);
menos.addEventListener("click", botonMenos);

function getData(){
    fetch('http://jsonblob.com/1295396315914428416')
        .then(res=>res.json)
        .then(datos=>{
            console.log(datos);
        })
}

