'use client';
import axios from "axios";
import Link from "next/link";

export default function CancelSale({ id }) {
    async function cancelarVenta(e) {
        e.preventDefault(); // Evita la navegación predeterminada del enlace
        const url = `http://localhost:3000/ventas/cancelarVenta/${id}`;

        try {
            const response = await axios.patch(url, {
                estado: 'cancelado' // Cambia el estado a 'cancelado'
            });
            console.log("Venta cancelada:", response.data);
            window.location.replace("/ventas/mostrar"); // Redirige a la lista de ventas
        } catch (error) {
            console.error("Error al cancelar la venta:", error);
        }
    }

    return (
        <Link href="#" onClick={cancelarVenta}>Cancelar Venta</Link>
    );
}
