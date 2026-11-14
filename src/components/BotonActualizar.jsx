// Vuelve a consultar al servidor ignorando la caché. Se deshabilita mientras hay una petición en curso.
export default function BotonActualizar({ onClick, cargando }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={cargando}
      className="rounded-md border border-blue-600 px-3 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {cargando ? 'Actualizando…' : 'Actualizar'}
    </button>
  );
}
