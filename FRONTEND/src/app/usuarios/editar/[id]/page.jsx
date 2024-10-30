'use client';
import { useEffect, useRef } from "react";
import axios from "axios";

async function editUser(e, id) {
    e.preventDefault();
    const url = `http://localhost:3000/editarUsuario/${id}`;
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    };
    await axios.put(url, datos);
    location.replace("http://localhost:3001/usuarios/mostrar");
}

export default function EditarUsuario({ params }) {
    const nombreRef = useRef(null);
    const usuarioRef = useRef(null);
    const passwordRef = useRef(null);
    const { id } = params;

    useEffect(() => {
        async function fetchUser() {
            if (id) {
                const url = `http://localhost:3000/buscarPorId/${id}`;
                const response = await axios.get(url);
                
                // Asignar los valores directamente a los elementos del DOM
                if (nombreRef.current) {
                    nombreRef.current.value = response.data.nombre;
                }
                if (usuarioRef.current) {
                    usuarioRef.current.value = response.data.usuario;
                }
                if (passwordRef.current) {
                    passwordRef.current.value = response.data.password;
                }
            }
        }
        fetchUser();

        // Enfocar el campo de "Nombre" después de que el usuario se cargue
        if (nombreRef.current) {
            nombreRef.current.focus();
        }
    }, [id]);

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={(e) => editUser(e, id)} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar Usuario</h1>
                        </div>
                        <div className="card-body">
                            <input 
                                ref={nombreRef} // Usar referencia para el campo de nombre
                                id="nombre" 
                                placeholder="Nombre" 
                                className="form-control mb-3" 
                                type="text" 
                            />
                            <input 
                                ref={usuarioRef} // Usar referencia para el campo de usuario
                                id="usuario" 
                                placeholder="Usuario" 
                                className="form-control mb-3" 
                                type="text" 
                            />
                            <input 
                                ref={passwordRef} // Usar referencia para el campo de contraseña
                                id="password" 
                                placeholder="Password" 
                                className="form-control mb-3" 
                                type="text" 
                            />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar cambios</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

