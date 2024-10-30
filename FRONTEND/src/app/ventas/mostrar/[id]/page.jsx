import axios from "axios";

async function getVentaById(id) {
    const url = `http://localhost:3000/ventas/buscarPorId/${id}`; // Cambia la URL a la correcta para obtener la venta
    const response = await axios.get(url);
    return response.data;
}

// Función para convertir la fecha en el formato de Firebase a un objeto Date
const parseFirebaseDate = (firebaseDate) => {
    if (!firebaseDate) {
        console.error("La fecha de Firebase es undefined");
        return new Date(); // Retorna una fecha por defecto o maneja el error como necesites
    }

    const [datePart, timePart] = firebaseDate.split(", "); // Divide en fecha y hora
    const [day, monthYear] = datePart.split(" de "); // Separa día y mes/año
    const [month, year] = monthYear.split(" "); // Separa mes y año
    const [time, period] = timePart.split(" "); // Separa tiempo y período (a.m./p.m.)

    const months = {
        enero: 0,
        febrero: 1,
        marzo: 2,
        abril: 3,
        mayo: 4,
        junio: 5,
        julio: 6,
        agosto: 7,
        septiembre: 8,
        octubre: 9,
        noviembre: 10,
        diciembre: 11,
    };

    let hours = parseInt(time.split(":")[0], 10);
    if (period === "p.m." && hours !== 12) {
        hours += 12; // Convierte a formato 24 horas
    } else if (period === "a.m." && hours === 12) {
        hours = 0; // 12 a.m. es 0 horas
    }

    return new Date(year, months[month], day, hours, parseInt(time.split(":")[1], 10), parseInt(time.split(":")[2], 10));
};

export default async function Productos({ params }) {
    const { id } = params; // Obtiene el ID de los parámetros
    let venta;

    try {
        // Obtener la venta por ID
        venta = await getVentaById(id);
        if (!venta) {
            console.error("No se encontró la venta con ID:", id);
            return <h1>No se encontró la venta</h1>;
        }
    } catch (error) {
        console.error("Error al obtener la venta:", error);
        return <h1>Error al cargar la venta</h1>;
    }

    console.log("Valor de venta:", venta); // Verifica qué contiene

    // Convierte la fecha de Firebase a un objeto Date
    const fechaHora = parseFirebaseDate(venta.fechaHora);

    // Formatear fecha y hora
    const formattedDate = fechaHora.toLocaleDateString(); // Formato: DD/MM/YYYY
    const formattedTime = fechaHora.toLocaleTimeString(); // Formato: HH:mm:ss

    return (
        <>
            <h1>Detalles de la Venta</h1>
            <p><strong>Cantidad:</strong> {venta.cantidad}</p>
            <p><strong>Estado:</strong> {venta.estado}</p>
            <p><strong>Fecha:</strong> {formattedDate}</p> {/* Muestra la fecha */}
            <p><strong>Hora:</strong> {formattedTime}</p> {/* Muestra la hora */}
            <p><strong>Producto:</strong> {venta.productoNombre}</p> {/* Asegúrate de que el nombre del producto esté en la respuesta */}
            <p><strong>Usuario:</strong> {venta.usuarioNombre}</p> {/* Asegúrate de que el nombre del usuario esté en la respuesta */}
        </>
    );
}
