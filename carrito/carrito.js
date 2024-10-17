export default class Carrito {


    #total
    #listaProductos
    #currency


    constructor() {
        this.listaProductos = new Map();
        this.total = 0;
    }

    setlistaProductos(listaProductos) {
        this.#listaProductos = new Map();  // Inicializa el Map
        listaProductos.forEach(producto => {
            this.#listaProductos.set(producto.SKU, producto);  // Agrega cada producto al Map
        });
    }

    getListaProductos() {
        return this.#listaProductos;
    }

    calculoTotalCarrito() {

    }

    actualizarUnidades(sku, unidades) {
        // Actualiza el número de unidades que se quieren comprar de un producto
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

