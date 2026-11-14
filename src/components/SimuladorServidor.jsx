import { useState } from 'react';
import { cache } from '../api/libreria.js';
import { ESCENARIOS, getEscenario, setEscenario } from '../mocks/escenario.js';

// Panel de pruebas del backend mock: permite forzar demoras y errores para verificar
// los indicadores de carga y el manejo de errores de la aplicación.
export default function SimuladorServidor() {
  const [escenario, setValor] = useState(getEscenario);
  const [aviso, setAviso] = useState('');

  const cambiar = (evento) => {
    setEscenario(evento.target.value);
    setValor(getEscenario());
    setAviso('');
  };

  const vaciarCache = () => {
    cache.limpiar();
    setAviso('Caché vaciada: la próxima visita a cada página consultará al servidor.');
  };

  return (
    <footer className="border-t border-gray-300 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3 text-sm text-gray-700">
        <label htmlFor="escenario" className="font-semibold">
          Simulador del servidor (mock)
        </label>
        <select
          id="escenario"
          value={escenario}
          onChange={cambiar}
          className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {ESCENARIOS.map(({ id, etiqueta }) => (
            <option key={id} value={id}>
              {etiqueta}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={vaciarCache}
          className="rounded-md border border-gray-400 px-2 py-1 font-medium transition hover:bg-gray-100"
        >
          Vaciar caché
        </button>
        <span role="status" className="text-gray-600">
          {aviso}
        </span>
      </div>
    </footer>
  );
}
