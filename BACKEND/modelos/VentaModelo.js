class Venta {
    constructor(data) {
        this.id = data.id;               // ID de la venta
        this.idUsuario = data.idUsuario;  // ID del usuario
        this.idProducto = data.idProducto; // ID del producto
        this.fec_hora = data.fec_hora;    // Fecha y hora de la venta
        this.cantidad = data.cantidad;     // Cantidad del producto
        this.estado = data.estado || 'pendiente'; // Estado de la venta, por defecto 'pendiente'
    }

    set id(id) {
        this._id = id; // Almacena el ID de la venta
    }

    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario; // Almacena el ID del usuario
    }

    set idProducto(idProducto) {
        this._idProducto = idProducto; // Almacena el ID del producto
    }

    set fec_hora(fec_hora) {
        this._fec_hora = fec_hora; // Almacena la fecha y hora
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad; // Almacena la cantidad del producto
    }

    set estado(estado) {
        this._estado = estado; // Almacena el estado de la venta
    }

    get id() {
        return this._id; // Retorna el ID de la venta
    }

    get idUsuario() {
        return this._idUsuario; // Retorna el ID del usuario
    }

    get idProducto() {
        return this._idProducto; // Retorna el ID del producto
    }

    get fec_hora() {
        return this._fec_hora; // Retorna la fecha y hora de la venta
    }

    get cantidad() {
        return this._cantidad; // Retorna la cantidad del producto
    }

    get estado() {
        return this._estado; // Retorna el estado de la venta
    }

    get getVenta() {
        const conid = {
            id: this.id,
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fec_hora: this.fec_hora,
            cantidad: this.cantidad,
            estado: this.estado // Incluye el estado en la representación de la venta
        };
        const sinid = {
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fec_hora: this.fec_hora,
            cantidad: this.cantidad,
            estado: this.estado // Incluye el estado en la representación de la venta
        };
        if (this.id === undefined) {
            return sinid; // Retorna la venta sin ID
        } else {
            return conid; // Retorna la venta con ID
        }
    }
}

module.exports = Venta; // Exporta la clase Venta