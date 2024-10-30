'use client';
import axios from "axios";
import { useState } from "react";

export default function NuevaVenta() {
    const [usuarioId, setUsuarioId] = useState(""); // Estado para ID de Usuario
    const [productoId, setProductoId] = useState(""); // Estado para ID de Producto
    const [cantidad, setCantidad] = useState(""); // Estado para Cantidad

    // Función para enviar la nueva venta
    async function newVenta(e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        const url = "http://localhost:3000/ventas/nuevaVenta"; // URL de la API

        // Obteniendo los datos del estado
        const datos = {
            idUsuario: usuarioId,
            idProducto: productoId,
            cantidad: cantidad // Manteniendo como texto
        };

        try {
            const response = await axios.post(url, datos); // Envía la solicitud POST
            console.log("Venta agregada:", response.data);
            location.replace("http://localhost:3001/ventas/mostrar"); // Redirige después de agregar
        } catch (error) {
            console.error("Error al agregar venta:", error.response.data);
            alert(error.response.data.message || "Error al agregar venta. Intente nuevamente."); // Muestra mensaje de error
        }
    }

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newVenta}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Nueva Venta</h1>
                        </div>
                        <div className="card-body">
                            <input
                                placeholder="ID Usuario"
                                className="form-control mb-3"
                                type="text"
                                value={usuarioId} // Vinculando el estado
                                onChange={(e) => setUsuarioId(e.target.value)} // Actualizando el estado
                                required // Campo requerido
                            />
                            <input
                                placeholder="ID Producto"
                                className="form-control mb-3"
                                type="text"
                                value={productoId} // Vinculando el estado
                                onChange={(e) => setProductoId(e.target.value)} // Actualizando el estado
                                required // Campo requerido
                            />
                            <input
                                placeholder="Cantidad"
                                className="form-control mb-3"
                                type="text" // Acepta texto
                                value={cantidad} // Vinculando el estado
                                onChange={(e) => setCantidad(e.target.value)} // Actualizando el estado
                                required // Campo requerido
                            />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar venta</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
