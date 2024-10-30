'use client';
import Link from "next/link";

export default function AddUser() {
    return (
        <Link href="/usuarios/nuevo">
            <button style={{ marginBottom: '10px' }}>
                Agregar Nuevo Usuario
            </button>
        </Link>
    );
}

