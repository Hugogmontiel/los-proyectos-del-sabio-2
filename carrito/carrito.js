export default class Carrito {


    #total
    #listaProductos
    #currency


    constructor() {
        this.#listaProductos = new Map();
        this.total = 0;
    }

    setlistaProductos(listaProductos) {
        this.#listaProductos = listaProductos;  
       
    }

    getListaProductos() {
        return this.#listaProductos;
    }

    setTotal() {
        this.#total = this.calculoTotal();
    }

    getTotal() {
        return this.#total;
    }



    setCurrency(currency) {
        this.#currency = currency;

    }

    getCurrency() {
        return this.#total;
    }

    calculoTotal() {
        let totalCarro = 0;
        this.#listaProductos.forEach(producto => {
            totalCarro += parseInt(producto.quantity) * parseFloat(producto.price);
        });

        return totalCarro.toFixed(2)

    }

    actualizarUnidades(sku, producto) {
        if(producto.quantity > 0 ) {
            this.#listaProductos.set(sku, producto);
        }
        else {
            this.#listaProductos.delete(sku);
        }
        
         
    }

      obtenerCarrito() {
        const listaProductosCarrito = Array.from(this.#listaProductos.values()); 
        
        if (listaProductosCarrito.length === 0) {
            alert("El carrito está vacío. No se puede guardar.");

            return null; 
        }

        const carritoJSON = JSON.stringify(listaProductosCarrito);
        console.log(carritoJSON);
        alert("Carrito guardado");

        return carritoJSON;
    }

    obtenerInformacionProducto(SKU) {
        return this.#listaProductos.get(SKU);  
    
    }
    
}

