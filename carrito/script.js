import carrito from "./carrito.js"
document.addEventListener("DOMContentLoaded", insertarTabla);

const mas = document.querySelector(".mas"); 
const menos = document.querySelector(".menos");
const contador = document.querySelector(".contador");
const unidad = document.querySelector(".valorUnidad");
const total = document.querySelector(".valorTotal");
const totalCarrito = document.querySelector(".right"); 
const tabla = document.querySelector('.tabla-main');

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

const carro = new carrito();


function cargarJSON(data) {
    carro.setlistaProductos(data.products);
    carro.currency = data.currency;
    console.log(carro.getListaProductos());


}

fetch('https://jsonblob.com/api/1295753236949360640')
.then((resp) => resp.json())
.then(function(data) {
    console.log(data)
    cargarJSON(data)
    
  })
.catch(function(error) {
  console.log(error);
});


function insertarTabla() {
    const listuca = carro.getListaProductos();
    listuca.array.forEach(element => {
        
        
    });
}
        






