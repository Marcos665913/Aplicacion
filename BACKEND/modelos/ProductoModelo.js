class Producto {
    constructor(data) {
        this.id = data.id;             // ID del producto
        this.nombre = data.nombre;     // Nombre del producto
        this.precio = data.precio;     // Precio del producto (string)
        this.cantidad = data.cantidad; // Cantidad del producto (string)
    }

    set id(id) {
        this._id = id; // Almacena el ID del producto
    }

    set nombre(nombre) {
        this._nombre = nombre; // Almacena el nombre
    }

    set precio(precio) {
        this._precio = precio; // Almacena el precio
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad; // Almacena la cantidad
    }

    get id() {
        return this._id; // Retorna el ID del producto
    }

    get nombre() {
        return this._nombre; // Retorna el nombre del producto
    }

    get precio() {
        return this._precio; // Retorna el precio del producto
    }

    get cantidad() {
        return this._cantidad; // Retorna la cantidad del producto
    }

    get getProducto() {
        const conid = {
            id: this.id,
            nombre: this.nombre,
            precio: this.precio,
            cantidad: this.cantidad,
        };
        const sinid = {
            nombre: this.nombre,
            precio: this.precio,
            cantidad: this.cantidad,
        };
        if (this.id === undefined) {
            return sinid; // Retorna el producto sin ID
        } else {
            return conid; // Retorna el producto con ID
        }
    }
}

module.exports = Producto; // Exporta la clase Producto