import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { claveLibros, obtenerLibros } from '../api/libreria.js';
import BotonActualizar from '../components/BotonActualizar.jsx';
import Cargando from '../components/Cargando.jsx';
import MensajeError from '../components/MensajeError.jsx';
import TarjetaLibro from '../components/TarjetaLibro.jsx';
import { useConsulta } from '../hooks/useConsulta.js';

export default function LibrosCategoria() {
  const { slug } = useParams();
  const consultar = useCallback((opciones) => obtenerLibros(slug, opciones), [slug]);
  const { datos, cargando, error, desactualizado, recargar } = useConsulta(claveLibros(slug), consultar);

  const libros = datos?.libros ?? [];

  return (
    <section aria-busy={cargando}>
      <Link to="/categorias" className="mb-4 inline-block text-sm text-blue-600 hover:underline">
        ← Volver a categorías
      </Link>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">{datos?.categoria.nombre ?? 'Libros'}</h1>
        {datos && <BotonActualizar onClick={recargar} cargando={cargando} />}
      </div>

      {error && (
        <div className="mb-4">
          <MensajeError
            error={error}
            onReintentar={recargar}
            conRespaldo={desactualizado}
            alternativa={{ to: '/categorias', etiqueta: 'Ver todas las categorías' }}
          />
        </div>
      )}

      {cargando && !datos && <Cargando mensaje="Cargando libros…" />}

      {datos && libros.length === 0 && (
        <p className="rounded-lg bg-white p-6 text-center text-gray-600 shadow-md">
          Aún no hay libros disponibles en esta categoría.
        </p>
      )}

      {libros.length > 0 && (
        <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${cargando ? 'opacity-60' : ''}`}>
          {libros.map((libro) => (
            <TarjetaLibro key={libro.id} libro={libro} />
          ))}
        </ul>
      )}
    </section>
  );
}
