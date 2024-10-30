'use client';
import axios from "axios";

async function newUser(e) {
    e.preventDefault();
    const url="http://localhost:3000/nuevoUsuario";
    const datos={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value
    }
    const answer = await axios.post(url,datos);
    location.replace("http://localhost:3001/usuarios/mostrar");
}
export default function Nuevo() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newUser} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Nuevo Usuario</h1>
                        </div>
                        <div className="card-body">
                            <input id="nombre" placeholder="Nombre" autoFocus className="form-control mb-3" type="text" />
                            <input id="usuario" placeholder="Usuario" className="form-control mb-3" type="text" />
                            <input id="password" placeholder="Password" className="form-control mb-3" type="text" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar usuario</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}