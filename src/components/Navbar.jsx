import { NavLink } from 'react-router-dom';

const ENLACES = [
  { to: '/', etiqueta: 'Inicio', end: true },
  { to: '/categorias', etiqueta: 'Categorías' },
];

export default function Navbar() {
  return (
    <header className="bg-blue-700 shadow">
      <nav aria-label="Menú principal" className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <span className="text-lg font-bold text-white">Librería</span>
        <ul className="flex gap-2">
          {ENLACES.map(({ to, etiqueta, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-white text-blue-700' : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                  }`
                }
              >
                {etiqueta}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
