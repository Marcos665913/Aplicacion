'use client';
import Link from "next/link";

export default function AddVenta() {
    return (
        <Link href="/ventas/nueva">
            <button style={{ marginBottom: '10px' }}>
                Agregar Nueva Venta
            </button>
        </Link>
    );
}


