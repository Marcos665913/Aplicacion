'use client';
import Link from "next/link";

export default function AddProd() {
    return (
        <Link href="/productos/nuevo">
            <button style={{ marginBottom: '10px' }}>
                Agregar Nuevo Producto
            </button>
        </Link>
    );
}
