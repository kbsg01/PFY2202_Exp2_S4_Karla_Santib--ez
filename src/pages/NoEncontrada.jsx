import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <section className="mx-auto max-w-xl rounded-lg bg-white p-6 text-center shadow-md">
      <h1 className="mb-2 text-2xl font-bold text-gray-800">Página no encontrada</h1>
      <p className="mb-4 text-gray-600">La dirección que abriste no existe en este sitio.</p>
      <Link to="/categorias" className="font-semibold text-blue-600 hover:underline">
        Ir a las categorías
      </Link>
    </section>
  );
}
