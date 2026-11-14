# Librería – Tienda de libros con API REST mock (React)

Karla Santibáñez Gutiérrez · Evaluación Formativa 3 · Desarrollo Frontend II (PFY2202) · Duoc UC · Semana 4

Aplicación React para explorar las categorías de una tienda de libros. El frontend se comunica por REST con un backend simulado con Mock Service Worker (MSW). La navegación usa React Router y el estilo, Tailwind CSS. Mantiene la base técnica de la semana 3 (Vite, React 18, React Router 7, Tailwind 3).

## Requisitos

- Node.js 20.19 o superior (probado con Node 22)
- npm

## Instalación y ejecución

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # sirve el build generado
npm test         # pruebas unitarias (caché, errores y validación)
npm run deploy   # publica /dist en la rama gh-pages
```

## API REST mock

Definida en `src/mocks/handlers.js` con MSW 2. El Service Worker (`public/mockServiceWorker.js`) intercepta las peticiones del navegador.

| Método y ruta                       | Respuesta                                                                               | Errores                                                                              |
| ------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET /api/categorias`              | `200` Lista de categorías: `slug`, `nombre`, `descripcion`, `cantidadLibros` | `500` según escenario                                                             |
| `GET /api/libros?categoria=<slug>` | `200` `{ categoria, libros[] }` (libro: `id`, `titulo`, `autor`, `precio`)  | `400` sin parámetro · `404` categoría inexistente · `500` según escenario |

El mock responde con un retraso de 0,7 s para que los indicadores de carga sean visibles. La categoría **Drama** no tiene libros, para probar el estado vacío.

### Simulador del servidor

El pie de página incluye un selector que cambia el comportamiento del mock sin tocar código:

| Escenario          | Qué simula                 | Qué se verifica                                |
| ------------------ | --------------------------- | ----------------------------------------------- |
| Normal             | Respuesta correcta en 0,7 s | Flujo completo                                  |
| Servidor lento     | Respuesta en 3 s            | Indicadores de carga                            |
| Error del servidor | HTTP 500                    | Mensaje de error, reintento y datos de respaldo |
| Sin conexión      | Falla de red                | Mensaje de conexión y reintento                |

«Vaciar caché» obliga a consultar de nuevo al servidor en la siguiente visita a cada página.

## Rutas

| Ruta                  | Página                 | Descripción                                     |
| --------------------- | ----------------------- | ------------------------------------------------ |
| `/`                 | Inicio                  | Bienvenida y acceso al catálogo                 |
| `/categorias`       | Categorías             | Lista obtenida de `GET /api/categorias`        |
| `/categorias/:slug` | Libros de la categoría | Lista obtenida de `GET /api/libros?categoria=` |
| `*`                 | No encontrada           | Cualquier otra dirección                        |

## Estructura

```
src/
├── App.jsx                    # Rutas (HashRouter) y estructura general
├── main.jsx                   # Inicia el mock y luego monta la app
├── api/
│   ├── clienteHttp.js         # fetch con tiempo máximo; convierte toda falla en ErrorApi
│   ├── errores.js             # Tipos de error y mensajes
│   ├── cache.js               # Caché en memoria con vigencia y deduplicación
│   ├── libreria.js            # Funciones de la API: categorías y libros
│   └── actividad.js           # Contador de peticiones en curso
├── hooks/
│   └── useConsulta.js         # Estados de carga, error y datos de respaldo
├── mocks/
│   ├── datos.js               # Categorías y libros simulados
│   ├── handlers.js            # Endpoints REST del mock
│   ├── escenario.js           # Escenario activo del simulador
│   └── browser.js             # Service Worker de MSW
├── components/                # Navbar, BarraProgreso, Cargando, MensajeError, TarjetaLibro, ...
├── pages/                     # Inicio, Categorias, LibrosCategoria, NoEncontrada
└── utils/                     # Validación del slug y formato de precios
tests/                         # Pruebas con node:test
```

## Cumplimiento de la pauta

| Criterio                                              | Evidencia en el proyecto                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Creación e integración de un mock REST           | `src/mocks/handlers.js` define dos endpoints REST con MSW; `main.jsx` espera a que el Service Worker esté activo antes de montar la app. El mock responde con 200, 400, 404 y 500, y la interfaz maneja cada caso.                                                                                                                     |
| 2. Manejo de errores en las peticiones                | `clienteHttp.js` clasifica la falla (red, tiempo de espera, 404, 4xx, 5xx, JSON inválido). `MensajeError.jsx` muestra qué pasó y qué hacer, con botón **Reintentar** y un enlace alternativo. Si la consulta falla y hay datos anteriores, se muestran como respaldo.                                                        |
| 3. Control de carga y estado de las peticiones        | `Cargando.jsx` (spinner con `role="status"`) en la primera carga; botón «Actualizando…» y contenido atenuado en las recargas; `BarraProgreso.jsx` se activa con cada petición en curso, incluidas las precargas.                                                                                                                 |
| 4. Optimización y eficiencia en la consulta de datos | `cache.js`: los datos vigentes (1 minuto) no se vuelven a pedir, y las peticiones simultáneas a la misma clave comparten una sola consulta. Precarga de libros al pasar el cursor sobre una categoría. Tiempo máximo de 8 s por petición con `AbortController`. Las respuestas de consultas ya descartadas no actualizan el estado. |

## Decisiones técnicas

- **Mock activo también en el build:** como la actividad no tiene backend real, MSW se inicia en desarrollo y en producción, para que el sitio publicado funcione. Se desactiva con la variable `VITE_USAR_MOCK=false`.
- **Validación de entradas:** el `slug` de la URL se valida con una expresión regular y se codifica con `encodeURIComponent` antes de enviarlo. React escapa todo el contenido mostrado; no se usa `dangerouslySetInnerHTML`.
- **Dependencias externas:** no se cargan recursos desde CDN, por lo que no se requiere Subresource Integrity. Las cabeceras de seguridad (HSTS, CSP) se configuran en el servidor que publique el sitio.
- **Accesibilidad:** indicadores con `role="status"`, errores con `role="alert"`, `aria-busy` en las secciones que cargan y navegación completa por teclado.
- **Publicación:** `HashRouter` y `base: './'` permiten que las rutas y los recursos funcionen en GitHub Pages.
- **Persistencia:** la caché vive en memoria y se reinicia al recargar la página.
