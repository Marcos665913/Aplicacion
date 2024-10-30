const productosBD = require("./conexion").productos; // Asumiendo que tienes una colección de productos
const Producto = require("../modelos/ProductoModelo"); // Importa el modelo de Producto

// Función para validar datos del producto
function validarDatos(producto) {
    var valido = false;
    if (producto.nombre !== undefined && producto.precio !== undefined && producto.cantidad !== undefined) {
        valido = true;
    }
    return valido;
}

// Mostrar todos los productos
async function mostrarProductos() {
    const productos = await productosBD.get();
    var productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });
    return productosValidos;
}

// Buscar producto por ID
async function busXId(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    var productoValido;
    if (validarDatos(producto1.getProducto)) {
        productoValido = producto1.getProducto;
    }
    return productoValido;
}

// Crear un nuevo producto
async function newProd(data) {
    const producto1 = new Producto(data);
    var productoValido = false;
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

// Borrar producto por ID
async function deleteProd(id) {
    var productoValido = await busXId(id);
    var productoBorrado = false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

// Editar producto por ID
async function editarProd(id, data) {
    const productoExistente = await busXId(id);
    var productoActualizado = false;

    if (productoExistente) {
        const productoNuevo = new Producto(data);

        if (validarDatos(productoNuevo.getProducto)) {
            await productosBD.doc(id).update(productoNuevo.getProducto);
            productoActualizado = true;
        }
    }
    return productoActualizado;
}

module.exports = {
    mostrarProductos,
    busXId,
    deleteProd,
    newProd,
    editarProd
};
