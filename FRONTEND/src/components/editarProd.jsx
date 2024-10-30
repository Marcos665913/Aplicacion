'use client';
import axios from "axios";
import Link from "next/link";

export default function EditProduct({ id }) {
    async function editar(e) {
        e.preventDefault(); // Evita la navegación predeterminada del enlace

        const url = `http://localhost:3000/productos/buscarPorId/${id}`;

        try {
            // Realiza la solicitud al backend para verificar que el producto existe
            await axios.get(url);

            // Redirige a la página de edición usando el ID
            window.location.replace(`/productos/editar/${id}`);
        } catch (error) {
            console.error("Error al editar producto:", error);
        }
    }

    return (
        <Link href={`/productos/editar/${id}`} onClick={editar}>
            Editar
        </Link>
    );
}
