import carrito from "./carrito.js"
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
    insertarTabla();
    
  })
.catch(function(error) {
  console.log(error);
});


function insertarTabla() {
    
    const listuca = carro.getListaProductos();
    
    
    listuca.forEach((producto, SKU) => {
        let modeloTabla ='<tr></tr>'
        modeloTabla = modeloTabla +  `<td><h2>${producto.title}</h2><p class="text-producto-pequeno">Ref:${SKU}</p></td>`;
        modeloTabla = modeloTabla + '<td><button class="menos" id="menos">-</button><span class="contador" id="contador">0</span><button class="mas" id="mas">+</button></td>';
        modeloTabla = modeloTabla + `<td><span class="valorUnidad">${producto.price}</span></td>`;
        modeloTabla = modeloTabla + '<td><span class="valorTotal">0</span></td>';
        tabla.innerHTML += modeloTabla;

        const mas = document.querySelector(".mas"); 
        const menos = document.querySelector(".menos");
        const contador = document.querySelector(".contador");
        const unidad = document.querySelector(".valorUnidad");
        const total = document.querySelector(".valorTotal");
        const totalCarrito = document.querySelector(".right"); 
        
        const valorUnidad = parseFloat(unidad);

        mas.addEventListener("click", botonMas);
        menos.addEventListener("click", botonMenos);

        
  });
  
}
const tabla = document.querySelector('.tabla-main');

let valorContador = 0;




function botonMas() {
    valorContador++;
    actualizarContador();
    
}

function botonMenos() {
    if (valorContador > 0) { 
        valorContador--;
    }
    actualizarContador();
    
}

function actualizarContador() {
    contador.innerHTML = valorContador;
}







