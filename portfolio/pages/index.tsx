import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <>
      <Head>
        <title>Alonso Gaspar Cruz Farías - Portafolio</title>
        <meta
          name="description"
          content="Portafolio profesional de Alonso Gaspar Cruz Farías, Ingeniero en Informática."
        />
      </Head>
      <Navbar />
      <main className="pt-20">
        {/* Home */}
        <motion.section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="https://via.placeholder.com/160"
            alt="Alonso Gaspar Cruz Farías"
            className="w-40 h-40 rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">
            Alonso Gaspar Cruz Farías
          </h1>
          <p className="mb-4 max-w-xl">
            Ingeniero en Informática orientado al desarrollo de software,
            liderazgo y servicio al cliente.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/alonsocruz/"
              target="_blank"
              rel="noopener"
              className="btn-primary"
            >
              LinkedIn
            </a>
            <a href="mailto:alonsocruz@example.com" className="btn-primary">
              Correo
            </a>
            <a href="tel:+56900000000" className="btn-primary">
              Teléfono
            </a>
          </div>
        </motion.section>

        {/* Sobre mí */}
        <motion.section
          id="about"
          className="py-20 bg-gray-100 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Sobre mí</h2>
          <p className="max-w-3xl mx-auto">
            Estudiante de Ingeniería en Informática formado en Duoc UC y la
            Universidad Diego Portales, ex alumno del Colegio Notre Dame. He
            desarrollado habilidades de liderazgo y servicio al cliente,
            destacando por mi compromiso, trabajo en equipo y aprendizaje
            continuo.
          </p>
        </motion.section>

        {/* Proyectos */}
        <motion.section
          id="projects"
          className="py-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-8 text-center">Proyectos</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <ProjectCard
              title="MasterbikesProject"
              description="Plataforma web para arriendos y ventas de bicicletas con registro, catálogo y soporte."
              tech="Django • SQLite • HTML • CSS • JS"
              link="https://github.com/cruch5357/MasterbikesProject"
            />
            <ProjectCard
              title="SantuarioCaelestis"
              description="Sistema de información para la gestión de un santuario, con administración de entidades y usuarios."
              tech="Django • SQLite • HTML • CSS • JS"
              link="https://github.com/cruch5357/SantuarioCaelestis"
            />
            <ProjectCard
              title="MoniCarro"
              description="Aplicación móvil para monitorear el estado de un vehículo en tiempo real."
              tech="Ionic Angular • Firebase"
              link="https://github.com/cruch5357/MoniCarro"
            />
            <ProjectCard
              title="RegistrApp"
              description="Registro de asistencia con Ionic y Firebase orientado a instituciones educativas."
              tech="Ionic Angular • Firebase"
              link="https://github.com/ant000o/ProyectoIonic"
            />
          </div>
        </motion.section>

        {/* Certificaciones */}
        <motion.section
          id="certs"
          className="py-20 bg-gray-100 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Certificaciones y habilidades
          </h2>
          <ul className="max-w-3xl mx-auto list-disc list-inside space-y-2">
            <li>Microsoft Certified: Azure AI Fundamentals</li>
            <li>Python Essentials 1</li>
            <li>PCEP – Certified Entry-Level Python Programmer</li>
            <li>Python • Ionic Angular • Firebase • MySQL • HTML • CSS • Git</li>
          </ul>
        </motion.section>

        {/* Experiencia */}
        <motion.section
          id="experience"
          className="py-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Experiencia profesional
          </h2>
          <ul className="max-w-3xl mx-auto list-disc list-inside space-y-2">
            <li>Empresas La Polar – Ayudante de Navidad</li>
            <li>Colegio Notre Dame – Centro de alumnos</li>
          </ul>
        </motion.section>

        {/* Currículum */}
        <motion.section
          id="cv"
          className="py-20 bg-gray-100 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6">Currículum</h2>
          <a href="/cv.pdf" className="btn-primary" target="_blank" rel="noopener">
            Descargar CV
          </a>
        </motion.section>

        {/* Contacto */}
        <motion.section
          id="contact"
          className="py-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center">Contacto</h2>
          <form className="max-w-xl mx-auto space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Correo"
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              placeholder="Mensaje"
              required
              className="w-full border p-2 rounded h-32"
            />
            <button type="submit" className="btn-primary w-full">Enviar</button>
          </form>
          <div className="flex justify-center space-x-6 mt-8 text-2xl">
            <a
              href="https://www.linkedin.com/in/alonsocruz/"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/cruch5357"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </motion.section>
      </main>
    </>
  );
}
