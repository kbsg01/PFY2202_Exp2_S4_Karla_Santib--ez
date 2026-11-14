const FORMATO_CLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

export function formatearPrecio(monto) {
  return FORMATO_CLP.format(monto);
}
