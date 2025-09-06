import { motion } from 'framer-motion';

interface Props {
  title: string;
  description: string;
  tech: string;
  link: string;
}

export default function ProjectCard({ title, description, tech, link }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 border rounded shadow bg-white flex flex-col"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-2 flex-1">{description}</p>
      <p className="text-sm text-gray-500 mb-4">{tech}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener"
        className="mt-auto btn-primary w-max"
      >
        Ver proyecto
      </a>
    </motion.div>
  );
}
