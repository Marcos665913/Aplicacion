'use client';
import axios from "axios";

async function newProduct(e) {
    e.preventDefault();
    const url="http://localhost:3000/productos/nuevoProducto";
    const datos={
        nombre:document.getElementById("nombre").value,
        cantidad:document.getElementById("cantidad").value,
        precio:document.getElementById("precio").value
    }
    const answer = await axios.post(url,datos);
    location.replace("http://localhost:3001/productos/mostrar");
}
export default function Nuevo() {
    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={newProduct} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Nuevo Producto</h1>
                        </div>
                        <div className="card-body">
                            <input id="nombre" placeholder="Nombre" autoFocus className="form-control mb-3" type="text" />
                            <input id="cantidad" placeholder="Cantidad" className="form-control mb-3" type="text" />
                            <input id="precio" placeholder="Precio" className="form-control mb-3" type="text" />
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary col-12 mt-3 mb-3" type="submit">Guardar producto</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}