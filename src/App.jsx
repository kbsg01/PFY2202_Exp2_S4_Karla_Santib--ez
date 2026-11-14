import { HashRouter, Route, Routes } from 'react-router-dom';
import BarraProgreso from './components/BarraProgreso.jsx';
import Navbar from './components/Navbar.jsx';
import SimuladorServidor from './components/SimuladorServidor.jsx';
import Categorias from './pages/Categorias.jsx';
import Inicio from './pages/Inicio.jsx';
import LibrosCategoria from './pages/LibrosCategoria.jsx';
import NoEncontrada from './pages/NoEncontrada.jsx';

export default function App() {
  return (
    // HashRouter: las rutas funcionan en GitHub Pages sin configurar el servidor.
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <BarraProgreso />
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 p-6">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/categorias/:slug" element={<LibrosCategoria />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </main>
        <SimuladorServidor />
      </div>
    </HashRouter>
  );
}
