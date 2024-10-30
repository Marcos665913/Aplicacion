import Link from "next/link"; // Asegúrate de importar Link
import CancelVent from "@/components/cancelarVenta";
import EditVent from "@/components/editarVent";
import AddVenta from "@/components/nuevaVenta"; // Importa el componente para agregar nueva venta
import axios from "axios";

async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();
    return (
        <>
            <h1>Ventas</h1>
            <AddVenta /> {/* Aquí se agrega el botón para agregar nuevas ventas */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario</th> {/* Mostrar el nombre del usuario */}
                        <th>Producto</th> {/* Mostrar el nombre del producto */}
                        <th>Cantidad Vendida</th>
                        <th>Editar / Cancelar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ventas.map((venta, i) => (
                            <tr key={venta.id}> {/* Usar 'venta.id' como clave para evitar colisiones */}
                                <td>
                                    <Link href={`/ventas/mostrar/${venta.id}`}> {/* Enlace a la página de detalles de la venta */}
                                        {i + 1} {/* Mostrar un índice o ID diferente si lo prefieres */}
                                    </Link>
                                </td>
                                <td>{venta.usuarioNombre}</td> {/* Mostrar el nombre del usuario */}
                                <td>{venta.productoNombre}</td> {/* Mostrar el nombre del producto */}
                                <td>{venta.cantidad}</td>
                                <td>
                                    <div className="d-flex">
                                        <EditVent id={venta.id} />
                                        <div style={{ margin: '0 10px' }}></div>
                                        <CancelVent id={venta.id} />
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
