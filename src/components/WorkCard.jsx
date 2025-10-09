import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const WorkCard = ({ project, index }) => {
  const handleClick = () => {
    if (project.link && typeof window !== 'undefined') {
      window.open(project.link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-nav rounded-xl overflow-hidden card-hover cursor-pointer relative"
      onClick={handleClick}
    >
      {/* Glow exterior alrededor del borde (posicionado fuera del contenido) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="green-edge-glow" />
      </div>

      <div className="relative overflow-hidden">
        {/* Video de portada */}
        <div className="w-full h-48 relative">
          {project.video ? (
            <video
              className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-100 opacity-30 relative z-10"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <div className="text-4xl font-bold text-primary/50">Proyecto {index + 1}</div>
            </div>
          )}

          {/* Overlay con efecto hover */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <ExternalLink className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
        </div>
      </div>

      <div className="p-6 relative z-30">
        <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {(project.tags || []).map((tag) => (
            <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;