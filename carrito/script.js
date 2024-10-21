import carrito from "./carrito.js"
const carro = new carrito();
const productos = new Map();
const tabla = document.querySelector('.tabla-main');
const prodTotal = document.querySelector('.productos-totales');
const totalFinal = document.querySelector('.right');

function setProductos(producto) {
    producto.forEach(products => {
    productos.set(products.SKU, products); 

});
}

function cargarJSON(data) {
    setProductos(data.products);
    carro.currency = data.currency;
    console.log(productos);
    

}

fetch('https://jsonblob.com/api/1296856240016449536')
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

    const listuca = productos;
    let resultadoTotal = 0;
    
    listuca.forEach((producto, SKU) => {
        let fila = document.createElement('tr');
        let celdaTitulo = document.createElement('td');
        const titulo = document.createElement('h2');
        titulo.innerText = producto.title; 
        const ref = document.createElement('p');
        ref.classList.add('text-producto-pequeno');
        ref.innerText = `Ref: ${SKU}`; 

        celdaTitulo.appendChild(titulo);
        celdaTitulo.appendChild(ref);


        let celdaUnidad = document.createElement('td');
        const botonMenos = document.createElement('button');
        botonMenos.classList.add('menos');
        botonMenos.innerText = '-';
        const contadorSpan = document.createElement('span');
        contadorSpan.classList.add('contador');
        contadorSpan.innerText = '0';
        const botonMas = document.createElement('button');
        botonMas.classList.add('mas');
        botonMas.innerText = '+';

        celdaUnidad.appendChild(botonMenos);
        celdaUnidad.appendChild(contadorSpan);
        celdaUnidad.appendChild(botonMas);



        let celdaPrecio = document.createElement('td');
        const precio = document.createElement('span');
        precio.classList.add('valorUnidad')
        precio.innerText = producto.price + "€";

        celdaPrecio.appendChild(precio);


        let celdaTotal = document.createElement('td');
        const total = document.createElement('span');
        total.classList.add('valorTotal')
        total.innerText = resultadoTotal + "€";

        celdaTotal.appendChild(total);

        fila.appendChild(celdaTitulo);
        fila.appendChild(celdaUnidad);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaTotal);
        
        tabla.appendChild(fila);

        botonMas.addEventListener('click', function() {
            let valorContador = parseInt(contadorSpan.innerText);
            valorContador++;
            contadorSpan.innerText = valorContador;
            resultadoTotal = (valorContador * parseFloat(producto.price)).toFixed(2) + "€";
            total.innerText = resultadoTotal;

            producto.quantity = valorContador;
            carro.actualizarUnidades(producto.SKU, productos.get(producto.SKU));
            console.log(carro.getListaProductos());
            actualizarTablaDerecha(SKU, producto);
        });

        botonMenos.addEventListener('click', function() {
            let valorContador = parseInt(contadorSpan.innerText);
            if (valorContador > 0) {
                valorContador--;
            }
            contadorSpan.innerText = valorContador;
            resultadoTotal = (valorContador * parseFloat(producto.price)).toFixed(2) + "€";
            total.innerText = resultadoTotal;

            producto.quantity = valorContador;
            carro.actualizarUnidades(producto.SKU, productos.get(producto.SKU));
            console.log(carro.getListaProductos());
            actualizarTablaDerecha(SKU, producto);
        });
     
  });
  
}


function actualizarTablaDerecha(SKU, producto) {
    let prodExistente = document.querySelector(`#prod-${SKU}`);
    totalFinal.innerText = carro.calculoTotal() + "€";
    
    if (producto.quantity === 0) {
        if (prodExistente) {
            prodTotal.removeChild(prodExistente);
        }
    } 
    else {
        if (prodExistente) {
            prodExistente.innerText = `${producto.quantity} ${producto.title} ${(producto.quantity * producto.price).toFixed(2)}€`;
        } 
        else {
            
            let prods = document.createElement('p');
            prods.id = `prod-${SKU}`;  
            prods.innerText = `${producto.quantity} ${producto.title} ${(producto.quantity * producto.price).toFixed(2)}€`;
            
            
            prodTotal.appendChild(prods);
        }
    }
}

const botonGuardarCarrito = document.getElementById('convertirJson');

botonGuardarCarrito.addEventListener('click', function() {
    carro.obtenerCarrito();
    
});


