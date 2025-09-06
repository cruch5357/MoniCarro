import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <a href="#home" className="font-bold text-lg">Alonso Cruz</a>
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <FaBars />
        </button>
        <ul className={`md:flex md:space-x-6 ${open ? 'block' : 'hidden'} md:block`}>
          <li><a href="#about" className="block py-2">Sobre mí</a></li>
          <li><a href="#projects" className="block py-2">Proyectos</a></li>
          <li><a href="#certs" className="block py-2">Certificaciones</a></li>
          <li><a href="#experience" className="block py-2">Experiencia</a></li>
          <li><a href="#contact" className="block py-2">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}
