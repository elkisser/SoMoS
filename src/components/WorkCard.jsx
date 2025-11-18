import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const WorkCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Cargar video solo cuando está visible
            setTimeout(() => setShouldLoad(true), 100);
            if (videoRef.current) {
              videoRef.current.load();
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (project.link && typeof window !== 'undefined') {
      window.open(project.link, '_blank');
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 12
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Card con glassmorphism premium */}
      <div className="relative h-full bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-300 ease-out shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10 overflow-hidden">
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-20"></div>

        {/* Video de portada con lazy loading */}
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-gray-800/40 to-gray-900/60">
          {project.video && shouldLoad ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 relative z-10"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : project.video ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-emerald-500/10 flex items-center justify-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Cargando...
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-emerald-500/10 flex items-center justify-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                Proyecto {index + 1}
              </div>
            </div>
          )}

          {/* Overlay con efecto hover premium */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-20 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
            >
              <ExternalLink className="w-6 h-6 text-primary" />
            </motion.div>
          </div>

          {/* Badge de categoría premium */}
          {project.category && (
            <div className="absolute top-3 left-3 z-30">
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/20 via-emerald-500/20 to-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-xs font-semibold">
                {project.category}
              </div>
            </div>
          )}
        </div>

        {/* Contenido premium */}
        <div className="p-6 relative z-10">
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <p className="text-gray-400 mb-4 text-sm md:text-base leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {(project.tags || []).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-emerald-500/10 border border-primary/20 text-primary text-xs font-medium backdrop-blur-sm group-hover:border-primary/30 group-hover:from-primary/20 group-hover:to-emerald-500/20 transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Partículas decorativas */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-30"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-30"></div>
      </div>
    </motion.div>
  );
};

export default WorkCard;
