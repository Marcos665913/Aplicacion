'use client';
import axios from "axios";
import Link from "next/link";

export default function EditUser({ id }) {
    async function editar(e) {
        e.preventDefault(); // Evita la navegación predeterminada del enlace
        
        const url = `http://localhost:3000/buscarPorId/${id}`;
        
        try {
            // Realiza la solicitud al backend
            await axios.get(url);

            // Redirige a la página de edición usando el ID
            window.location.replace(`/usuarios/editar/${id}`);
        } catch (error) {
            console.error("Error al editar usuario:", error);
        }
    }

    return (
        <Link href={`/usuarios/editar/${id}`} onClick={editar}>
            Editar
        </Link>
    );
}

