import { formatearPrecio } from '../utils/formato.js';

export default function TarjetaLibro({ libro }) {
  return (
    <li className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{libro.titulo}</h3>
        <p className="text-sm text-gray-600">{libro.autor}</p>
      </div>
      <p className="mt-4 text-lg font-bold text-blue-700">{formatearPrecio(libro.precio)}</p>
    </li>
  );
}
