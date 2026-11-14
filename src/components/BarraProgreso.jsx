import { useSyncExternalStore } from 'react';
import { getEnCurso, suscribir } from '../api/actividad.js';

// Barra superior visible mientras exista al menos una petición en curso (incluye recargas y precargas).
export default function BarraProgreso() {
  const enCurso = useSyncExternalStore(suscribir, getEnCurso);
  const activa = enCurso > 0;

  return (
    <div className="h-1 w-full overflow-hidden bg-blue-900" aria-hidden="true">
      <div className={`h-full w-1/3 bg-amber-400 ${activa ? 'animate-progreso' : 'hidden'}`} />
    </div>
  );
}
