import { Link } from 'react-router-dom';
import { CLAVE_CATEGORIAS, obtenerCategorias, precargarLibros } from '../api/libreria.js';
import BotonActualizar from '../components/BotonActualizar.jsx';
import Cargando from '../components/Cargando.jsx';
import MensajeError from '../components/MensajeError.jsx';
import { useConsulta } from '../hooks/useConsulta.js';

export default function Categorias() {
  const { datos: categorias, cargando, error, desactualizado, recargar } = useConsulta(CLAVE_CATEGORIAS, obtenerCategorias);

  return (
    <section aria-busy={cargando}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Categorías de libros</h1>
        {categorias && <BotonActualizar onClick={recargar} cargando={cargando} />}
      </div>

      {error && (
        <div className="mb-4">
          <MensajeError
            error={error}
            onReintentar={recargar}
            conRespaldo={desactualizado}
            alternativa={{ to: '/', etiqueta: 'Volver al inicio' }}
          />
        </div>
      )}

      {/* Primera carga: aún no hay datos que mostrar */}
      {cargando && !categorias && <Cargando mensaje="Cargando categorías…" />}

      {categorias && (
        <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${cargando ? 'opacity-60' : ''}`}>
          {categorias.map((categoria) => (
            <li key={categoria.slug}>
              <Link
                to={`/categorias/${categoria.slug}`}
                // Precarga al pasar el cursor o enfocar: al entrar, los libros ya están en caché.
                onMouseEnter={() => precargarLibros(categoria.slug)}
                onFocus={() => precargarLibros(categoria.slug)}
                className="block h-full rounded-lg bg-white p-4 shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <h2 className="text-lg font-semibold text-blue-700">{categoria.nombre}</h2>
                <p className="mt-1 text-sm text-gray-600">{categoria.descripcion}</p>
                <p className="mt-3 text-sm font-medium text-gray-800">
                  {categoria.cantidadLibros === 1 ? '1 libro' : `${categoria.cantidadLibros} libros`}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
