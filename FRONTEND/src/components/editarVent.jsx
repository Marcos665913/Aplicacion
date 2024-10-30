'use client';
import axios from "axios";
import Link from "next/link";

export default function EditSale({ id }) {
    async function editar(e) {
        e.preventDefault(); // Evita la navegación predeterminada del enlace

        const url = `http://localhost:3000/ventas/buscarPorId/${id}`; // Cambia la ruta a 'ventas'

        try {
            // Realiza la solicitud al backend para verificar que la venta existe
            await axios.get(url);

            // Redirige a la página de edición usando el ID
            window.location.replace(`/ventas/editar/${id}`); // Cambia la ruta a 'ventas'
        } catch (error) {
            console.error("Error al editar venta:", error);
        }
    }

    return (
        <Link href={`/ventas/editar/${id}`} onClick={editar}> {/* Cambia la ruta a 'ventas' */}
            Editar
        </Link>
    );
}
