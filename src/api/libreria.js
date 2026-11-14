import { crearCache } from './cache.js';
import { obtenerJson } from './clienteHttp.js';
import { esSlugValido } from '../utils/validacion.js';
import { ErrorApi, TIPO_ERROR } from './errores.js';

// Una sola caché compartida por toda la aplicación (vigencia: 1 minuto).
export const cache = crearCache({ vigenciaMs: 60_000 });

export const CLAVE_CATEGORIAS = 'categorias';
export const claveLibros = (slug) => `libros:${slug}`;

export function obtenerCategorias(opciones) {
  return cache.obtener(CLAVE_CATEGORIAS, () => obtenerJson('/api/categorias'), opciones);
}

export function obtenerLibros(slug, opciones) {
  // El slug viene de la URL: se valida antes de usarlo y se codifica al armar la consulta.
  if (!esSlugValido(slug)) return Promise.reject(new ErrorApi(TIPO_ERROR.NO_ENCONTRADO, 404));
  const url = `/api/libros?categoria=${encodeURIComponent(slug)}`;
  return cache.obtener(claveLibros(slug), () => obtenerJson(url), opciones);
}

// Precarga silenciosa: si falla no molesta al usuario; el error se mostrará al entrar a la página.
export function precargarLibros(slug) {
  obtenerLibros(slug).catch(() => {});
}
