import { http, HttpResponse, delay } from 'msw';
import { CATEGORIAS, LIBROS_POR_CATEGORIA } from './datos.js';
import { getEscenario } from './escenario.js';

// Aplica el escenario activo antes de responder. Devuelve una respuesta de error o null para continuar.
async function aplicarEscenario() {
  const escenario = getEscenario();
  await delay(escenario === 'lento' ? 3000 : 700); // retraso simulado del servidor

  if (escenario === 'sin-conexion') return HttpResponse.error(); // falla de red: fetch rechaza la promesa
  if (escenario === 'error-servidor') {
    return HttpResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 });
  }
  return null;
}

export const handlers = [
  // GET /api/categorias -> lista de categorías con la cantidad de libros de cada una
  http.get('/api/categorias', async () => {
    const fallo = await aplicarEscenario();
    if (fallo) return fallo;

    const categorias = CATEGORIAS.map((categoria) => ({
      ...categoria,
      cantidadLibros: LIBROS_POR_CATEGORIA[categoria.slug]?.length ?? 0,
    }));
    return HttpResponse.json(categorias);
  }),

  // GET /api/libros?categoria=<slug> -> libros de una categoría
  http.get('/api/libros', async ({ request }) => {
    const fallo = await aplicarEscenario();
    if (fallo) return fallo;

    const slug = new URL(request.url).searchParams.get('categoria');
    if (!slug) {
      return HttpResponse.json({ mensaje: 'Falta el parámetro "categoria"' }, { status: 400 });
    }

    const categoria = CATEGORIAS.find((c) => c.slug === slug);
    if (!categoria) {
      return HttpResponse.json({ mensaje: `La categoría "${slug}" no existe` }, { status: 404 });
    }

    return HttpResponse.json({ categoria, libros: LIBROS_POR_CATEGORIA[slug] ?? [] });
  }),
];
