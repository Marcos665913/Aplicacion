'use client'; // Asegúrate de incluir esto si estás usando hooks en un componente del lado del cliente
import { useEffect, useRef } from "react"; // Importa useEffect y useRef
import axios from "axios";

async function editVenta(e, id) {
    e.preventDefault(); // Evita la acción predeterminada del formulario
    const url = `http://localhost:3000/ventas/editarVenta/${id}`; // Cambia esto si es necesario
    const datos = {
        cantidad: document.getElementById("cantidad").value // Campo de cantidad como texto
    };
    await axios.patch(url, datos); // Usar PATCH para editar
    location.replace("http://localhost:3001/ventas/mostrar"); // Redirigir después de guardar
}

export default function EditarVenta({ params }) {
    const cantidadRef = useRef(null);
    const id = params?.id; // Usa el operador de encadenamiento opcional

    useEffect(() => {
        async function fetchVenta() {
            if (id) {
                const url = `http://localhost:3000/ventas/buscarPorId/${id}`;
                const response = await axios.get(url);
                
                // Asignar los valores directamente a los elementos del DOM
                if (cantidadRef.current) {
                    cantidadRef.current.value = response.data.cantidad; // Asignar cantidad como texto
                }
            }
        }
        fetchVenta();

        // Enfocar el campo de "Cantidad" después de que la venta se cargue
        if (cantidadRef.current) {
            cantidadRef.current.focus();
        }
    }, [id]);

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={(e) => editVenta(e, id)} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar Venta</h1>
                        </div>
                        <div className="card-body">
                            <input 
                                ref={cantidadRef} // Usar referencia para el campo de cantidad
                                id="cantidad" 
                                placeholder="Cantidad Vendida" 
                                className="form-control mb-3" 
                                type="text" // Mantener cantidad como texto
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
