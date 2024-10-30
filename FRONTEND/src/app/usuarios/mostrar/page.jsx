import Link from "next/link"; // Asegúrate de importar Link
import DeleteUser from "@/components/borrar";
import EditUser from "@/components/editar";
import AddUser from "@/components/nuevo"; // Importa el componente AddUser
import axios from "axios";

async function getUsuarios() {
    const url = "http://localhost:3000"; // Asegúrate de que la URL sea correcta
    const usuarios = await axios.get(url);
    return usuarios.data;
}

export default async function User() {
    const usuarios = await getUsuarios();
    return (
        <>
            <h1>Usuarios</h1>
            <AddUser /> {/* Botón para agregar un nuevo usuario */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Edit / Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map((usuario, i) => (
                            <tr key={usuario.id}> {/* Usa 'usuario.id' para la clave */}
                                <td>{i + 1}</td> {/* Mostrar un ID diferente (por ejemplo, el índice + 1) */}
                                <td>
                                    <Link href={`http://localhost:3001/usuarios/mostrar/${usuario.id}`}> {/* Cambiar a la URL correcta */}
                                        {usuario.nombre}
                                    </Link>
                                </td>
                                <td>{usuario.usuario}</td>
                                <td>
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <DeleteUser id={usuario.id} />
                                        <EditUser id={usuario.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
