import { Link } from 'react-router-dom';

export default function Inicio() {
  return (
    <section className="mx-auto max-w-xl rounded-lg bg-white p-6 text-center shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Bienvenido a la Librería</h1>
      <p className="mb-6 text-gray-600">
        Explora nuestro catálogo por categorías. Los datos provienen de una API REST simulada con Mock Service Worker.
      </p>
      <Link to="/categorias" className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
        Ver categorías
      </Link>
    </section>
  );
}
