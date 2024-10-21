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

    setTotal(total) {
        this.#total = total;
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

    calculoTotalCarrito() {
        
    }

    actualizarUnidades(sku, producto) {
        if(producto.quantity > 0 ) {
            this.#listaProductos.set(sku, producto);
        }
        else {
            this.#listaProductos.delete(sku);
        }
        
         
    }

    obtenerInformacionProducto(sku) {
            // Devuelve los datos de un producto además de las unidades seleccionadas
            // Por ejemplo
            // {
            // "sku": "0K3QOSOV4V",
            // "quantity": 3
            // }
    }

    obtenerInformacionProducto(SKU) {
        return this.#listaProductos.get(SKU);  
    
    }
    
}

