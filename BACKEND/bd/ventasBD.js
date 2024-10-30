const ventasBD = require("./conexion").ventas;
const usuarioBD = require("./conexion").usuarios;
const productoBD = require("./conexion").productos;
const admin = require('firebase-admin');
const Venta = require("../modelos/VentaModelo"); // Importa el modelo de Venta

// Función para validar datos de la venta
function validarDatos(venta) {
    return venta.idUsuario !== undefined && 
           venta.idProducto !== undefined && 
           venta.fec_hora !== undefined && 
           venta.cantidad !== undefined &&
           venta.estado !== undefined;
}

// Mostrar todas las ventas
async function mostrarVentas() {
    const ventas = await ventasBD.get();
    let ventasValidas = [];
    
    for (const venta of ventas.docs) {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });

        // Validar que el ID de usuario y producto no sean nulos o vacíos
        if (!venta1.idUsuario || !venta1.idProducto) {
            console.log("ID de usuario o producto no válido en la venta:", venta1);
            continue; // Saltar esta venta si falta el ID de usuario o producto
        }

        // Obtener usuario y producto
        const usuario1 = await usuarioBD.doc(venta1.idUsuario).get(); 
        const producto1 = await productoBD.doc(venta1.idProducto).get(); 
        
        if (!usuario1.exists || !producto1.exists) {
            console.log("Usuario o producto no encontrado");
            continue; // Saltar esta venta si falta el usuario o el producto
        }
        
        const usuario = usuario1.data();
        const producto = producto1.data();

        // Validar datos y agregar nombre en lugar de ID
        if (validarDatos(venta1.getVenta)) {
            const ventaConNombres = {
                ...venta1.getVenta,
                usuarioNombre: usuario.nombre, 
                productoNombre: producto.nombre
            };
            ventasValidas.push(ventaConNombres);
        }
    }

    return ventasValidas;
}

// Buscar venta por ID
async function busXId(id) {
    const venta = await ventasBD.doc(id).get();
    
    if (!venta.exists) return null; // Si no existe la venta, devolver null
    
    const venta1 = new Venta({ id: venta.id, ...venta.data() });

    const usuario = await usuarioBD.doc(venta1.idUsuario).get();
    const producto = await productoBD.doc(venta1.idProducto).get();

    if (!usuario.exists || !producto.exists) return null;

    if (validarDatos(venta1.getVenta)) {
        return {
            ...venta1.getVenta,
            usuarioNombre: usuario.data().nombre,
            productoNombre: producto.data().nombre
        };
    }
    
    return null;
}

// Crear una nueva venta
async function newSale(data) {
    // Verificar si el ID de usuario o el ID de producto están vacíos
    if (!data.idUsuario || !data.idProducto) {
        return {
            success: false,
            message: "El ID de usuario o el ID de producto no pueden estar vacíos."
        };
    }

    const venta1 = new Venta({
        ...data, 
        fec_hora: admin.firestore.Timestamp.now(), 
        estado: 'pendiente' 
    });

    // Obtener datos de usuario y producto
    const usuario = await usuarioBD.doc(data.idUsuario).get();
    const producto = await productoBD.doc(data.idProducto).get();

    // Validar que existan usuario y producto
    if (!usuario.exists || !producto.exists) {
        return {
            success: false,
            message: "El usuario o el producto no existen."
        };
    }

    // Validar los datos de la venta
    if (validarDatos(venta1.getVenta)) {
        await ventasBD.doc().set({
            ...venta1.getVenta,
            estado: 'vendido' 
        });
        return { success: true };
    }

    return {
        success: false,
        message: "Los datos de la venta no son válidos."
    };
}

// Cancelar venta por ID
async function cancelSale(id) {
    const ventaValida = await busXId(id);
    
    if (ventaValida) {
        // Marcar la venta como cancelada
        await ventasBD.doc(id).update({
            estado: 'cancelado'
        });
        return true;
    }
    
    return false;
}

// Editar la cantidad de un producto en una venta
async function editarVenta(id, nuevaCantidad) {
    const ventaValida = await busXId(id); // Obtener la venta existente

    if (!ventaValida) {
        return false; // Si la venta no existe, devolver false
    }

    // Actualizar solo la cantidad de la venta
    await ventasBD.doc(id).update({
        cantidad: nuevaCantidad // Actualizar la cantidad
    });

    return true; // Devolver true si la actualización fue exitosa
}

// Exportar la nueva función
module.exports = {
    mostrarVentas,
    busXId,
    cancelSale,
    newSale,
    editarVenta // Agrega esta línea para exportar la función
};
