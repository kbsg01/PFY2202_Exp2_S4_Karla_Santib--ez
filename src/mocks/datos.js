// Datos simulados del backend. Precios en pesos chilenos (CLP).
export const CATEGORIAS = [
  { slug: 'ficcion', nombre: 'Ficción', descripcion: 'Novelas y relatos de la literatura universal.' },
  { slug: 'ciencia-ficcion', nombre: 'Ciencia Ficción', descripcion: 'Futuros posibles, tecnología y otros mundos.' },
  { slug: 'fantasia', nombre: 'Fantasía', descripcion: 'Magia, criaturas y reinos imaginarios.' },
  { slug: 'misterio', nombre: 'Misterio', descripcion: 'Crímenes, detectives y secretos por resolver.' },
  { slug: 'no-ficcion', nombre: 'No Ficción', descripcion: 'Ensayo, divulgación e historia.' },
  { slug: 'drama', nombre: 'Drama', descripcion: 'Teatro y obras dramáticas.' },
];

export const LIBROS_POR_CATEGORIA = {
  ficcion: [
    { id: 'f1', titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', precio: 15990 },
    { id: 'f2', titulo: 'La casa de los espíritus', autor: 'Isabel Allende', precio: 13990 },
    { id: 'f3', titulo: 'Rayuela', autor: 'Julio Cortázar', precio: 14490 },
    { id: 'f4', titulo: 'Los detectives salvajes', autor: 'Roberto Bolaño', precio: 17990 },
  ],
  'ciencia-ficcion': [
    { id: 'c1', titulo: 'Dune', autor: 'Frank Herbert', precio: 18990 },
    { id: 'c2', titulo: 'Fundación', autor: 'Isaac Asimov', precio: 12990 },
    { id: 'c3', titulo: 'Neuromante', autor: 'William Gibson', precio: 13490 },
    { id: 'c4', titulo: 'La mano izquierda de la oscuridad', autor: 'Ursula K. Le Guin', precio: 14990 },
  ],
  fantasia: [
    { id: 'a1', titulo: 'El Hobbit', autor: 'J. R. R. Tolkien', precio: 12990 },
    { id: 'a2', titulo: 'Un mago de Terramar', autor: 'Ursula K. Le Guin', precio: 11990 },
    { id: 'a3', titulo: 'El nombre del viento', autor: 'Patrick Rothfuss', precio: 19990 },
  ],
  misterio: [
    { id: 'm1', titulo: 'Asesinato en el Orient Express', autor: 'Agatha Christie', precio: 9990 },
    { id: 'm2', titulo: 'El nombre de la rosa', autor: 'Umberto Eco', precio: 16990 },
    { id: 'm3', titulo: 'El sabueso de los Baskerville', autor: 'Arthur Conan Doyle', precio: 8990 },
  ],
  'no-ficcion': [
    { id: 'n1', titulo: 'Sapiens', autor: 'Yuval Noah Harari', precio: 18990 },
    { id: 'n2', titulo: 'Cosmos', autor: 'Carl Sagan', precio: 17490 },
    { id: 'n3', titulo: 'Breve historia del tiempo', autor: 'Stephen Hawking', precio: 13990 },
  ],
  // Arreglo vacío a propósito: permite probar la pantalla cuando una categoría no tiene libros.
  drama: [],
};
