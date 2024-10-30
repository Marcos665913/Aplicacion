const rutas = require("express").Router();
const { mostrarVentas, busXId, cancelSale, newSale, editarVenta } = require("../bd/ventasBD");

// Obtener todas las ventas
rutas.get("/", async (req, res) => {
    const ventasValidas = await mostrarVentas();
    res.json(ventasValidas); // Respuesta de ventas
});

// Buscar venta por ID
rutas.get("/buscarPorId/:id", async (req, res) => {
    const ventaValida = await busXId(req.params.id);
    res.json(ventaValida);
});

// Cancelar venta por ID
rutas.patch("/cancelarVenta/:id", async (req, res) => {
    const ventaCancelada = await cancelSale(req.params.id);
    res.json(ventaCancelada);
});

// Crear una nueva venta
rutas.post("/nuevaVenta", async (req, res) => {
    const ventaValida = await newSale(req.body);
    res.json(ventaValida);
});

// Editar cantidad de venta
rutas.patch("/editarVenta/:id", async (req, res) => {
    const { cantidad } = req.body; // Suponiendo que la cantidad se envía en el cuerpo de la solicitud
    const ventaEditada = await editarVenta(req.params.id, cantidad);
    res.json(ventaEditada);
});

module.exports = rutas;