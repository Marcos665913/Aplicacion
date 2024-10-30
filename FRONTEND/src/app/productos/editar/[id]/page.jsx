'use client';
import { useEffect, useRef } from "react";
import axios from "axios";

async function editProduct(e, id) {
    e.preventDefault(); // Evita la acción predeterminada del formulario
    const url = `http://localhost:3000/productos/editarProducto/${id}`;
    const datos = {
        nombre: document.getElementById("nombre").value,
        cantidad: document.getElementById("cantidad").value, // Campo de cantidad como texto
        precio: document.getElementById("precio").value
    };
    await axios.put(url, datos); // Enviar los datos al backend
    location.replace("http://localhost:3001/productos/mostrar"); // Redirigir después de guardar
}

export default function EditarProducto({ params }) {
    const nombreRef = useRef(null);
    const cantidadRef = useRef(null);
    const precioRef = useRef(null);
    const { id } = params;

    useEffect(() => {
        async function fetchProduct() {
            if (id) {
                const url = `http://localhost:3000/productos/buscarPorId/${id}`;
                const response = await axios.get(url);
                
                // Asignar los valores directamente a los elementos del DOM
                if (nombreRef.current) {
                    nombreRef.current.value = response.data.nombre;
                }
                if (cantidadRef.current) {
                    cantidadRef.current.value = response.data.cantidad; // Asignar cantidad como texto
                }
                if (precioRef.current) {
                    precioRef.current.value = response.data.precio;
                }
            }
        }
        fetchProduct();

        // Enfocar el campo de "Nombre" después de que el producto se cargue
        if (nombreRef.current) {
            nombreRef.current.focus();
        }
    }, [id]);

    return (
        <>
            <div className="m-0 row justify-content-center">
                <form className="col-6 mt-5 text-center" onSubmit={(e) => editProduct(e, id)} action="" method="post">
                    <div className="card">
                        <div className="card-header">
                            <h1>Editar Producto</h1>
                        </div>
                        <div className="card-body">
                            <input 
                                ref={nombreRef} // Usar referencia para el campo de nombre
                                id="nombre" 
                                placeholder="Nombre del Producto" 
                                className="form-control mb-3" 
                                type="text" 
                            />
                            <input 
                                ref={cantidadRef} // Usar referencia para el campo de cantidad
                                id="cantidad" 
                                placeholder="Cantidad" 
                                className="form-control mb-3" 
                                type="text" // Mantener cantidad como texto
                            />
                            <input 
                                ref={precioRef} // Usar referencia para el campo de precio
                                id="precio" 
                                placeholder="Precio" 
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
