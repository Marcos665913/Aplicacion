// usuarios/mostrar/[id]/page.jsx
import axios from "axios";

async function getUsuarioById(id) {
    const url = `http://localhost:3000/buscarPorId/${id}`; // Cambia la URL para buscar por ID
    const response = await axios.get(url);
    return response.data;
}

export default async function MostrarUsuario({ params }) {
    try {
        const usuario = await getUsuarioById(params.id); // Usa 'params.id' para obtener el ID del usuario

        return (
            <>
                <h1>Información del Usuario</h1>
                <p><strong>ID:</strong> {usuario.id}</p>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Usuario:</strong> {usuario.usuario}</p>
                <p><strong>Password:</strong> Confidencial</p> {/* Considera no mostrar la contraseña */}
                <p><strong>Tipo de Usuario:</strong> {usuario.tipoUsuario}</p>
            </>
        );
    } catch (error) {
        return <h1>Error: Usuario no encontrado</h1>;
    }
}
