import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkCard from './WorkCard.jsx';
import ProjectFilters from './ProjectFilters.jsx';

const ProjectsGrid = ({ projects }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  const categories = {
    'desarrollo-web': { 
      name: 'Desarrollo Web', 
      icon: '🖥️',
      description: 'Soluciones web que impulsan tu negocio'
    },
    'apps-moviles': { 
      name: 'Apps Móviles', 
      icon: '📱',
      description: 'Experiencias móviles que conectan con tus clientes'
    },
    'branding': { 
      name: 'Branding', 
      icon: '✨',
      description: 'Identidades que destacan en el mercado'
    }
  };

  const { filteredProjects, groupedProjects } = useMemo(() => {
    if (activeFilters.length === 0) {
      const grouped = {};
      projects.forEach(project => {
        if (!grouped[project.category]) {
          grouped[project.category] = [];
        }
        grouped[project.category].push(project);
      });
      return { filteredProjects: [], groupedProjects: grouped };
    } else {
      const filtered = projects.filter(project => 
        activeFilters.includes(project.category)
      );
      return { filteredProjects: filtered, groupedProjects: {} };
    }
  }, [projects, activeFilters]);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  return (
    <div className="space-y-12 px-4 md:px-6">
      {/* Filtros SoMoS */}
      <ProjectFilters 
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
        categories={categories}
      />
      
      <AnimatePresence mode="wait">
        {activeFilters.length === 0 ? (
          // Vista agrupada por categorías
          <div className="space-y-20">
            {Object.entries(groupedProjects).map(([categoryId, categoryProjects], categoryIndex) => (
              <motion.section
                key={categoryId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ 
                  duration: 0.8, 
                  delay: categoryIndex * 0.15,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="space-y-12"
              >
                {/* Header de categoría premium - Layout horizontal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.2 }}
                  className="relative"
                >
                  {/* Fondo decorativo */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6">
                    {/* Icono premium con glassmorphism - A la izquierda */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex-shrink-0"
                    >
                      <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-primary/20 shadow-xl shadow-primary/10">
                        <motion.span
                          className="text-2xl md:text-3xl"
                          animate={{ 
                            filter: [
                              'drop-shadow(0 0 0px rgba(0, 255, 136, 0))',
                              'drop-shadow(0 0 8px rgba(0, 255, 136, 0.5))',
                              'drop-shadow(0 0 0px rgba(0, 255, 136, 0))'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                          {categories[categoryId]?.icon}
                        </motion.span>
                      </div>
                    </motion.div>
                    
                    {/* Contenido a la derecha del icono */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                        <div className="flex-1">
                          <motion.h3
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: categoryIndex * 0.1 + 0.3, duration: 0.4 }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-1"
                          >
                            {categories[categoryId]?.name}
                          </motion.h3>
                          
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: categoryIndex * 0.1 + 0.4, duration: 0.4 }}
                            className="text-primary text-sm md:text-base font-medium"
                          >
                            {categories[categoryId]?.description}
                          </motion.p>
                        </div>
                        
                        {/* Badge de cantidad de proyectos */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: categoryIndex * 0.1 + 0.5, duration: 0.4 }}
                          className="flex-shrink-0"
                        >
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/30 border border-gray-700/30 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-gray-400 text-xs md:text-sm font-medium">
                              {categoryProjects.length} proyecto{categoryProjects.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Línea decorativa animada - Debajo del título */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.6 }}
                        className="mt-3 flex items-center gap-2"
                      >
                        <div className="h-px flex-1 bg-gradient-to-r from-primary via-primary/50 to-transparent"></div>
                        <div className="w-1 h-1 rounded-full bg-primary"></div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Grid de proyectos mejorado */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {categoryProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 60, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 120,
                        damping: 12
                      }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.15, ease: "easeOut" }
                      }}
                      className="group"
                    >
                      <WorkCard project={project} index={index} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        ) : (
          // Vista filtrada mejorada
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -60, scale: 0.95 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 120,
                    damping: 12
                  }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                  className="group"
                >
                  <WorkCard project={project} index={index} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                className="col-span-full text-center py-16 md:py-24"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-lg mb-6">
                  <span className="text-3xl md:text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Proyectos no encontrados
                </h3>
                <p className="text-gray-400 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  No hemos encontrado proyectos que coincidan con los filtros seleccionados. 
                  En SoMoS tenemos una amplia variedad de trabajos - explora otras categorías.
                </p>
                <button
                  onClick={() => setActiveFilters([])}
                  className="px-6 py-3 md:px-8 md:py-4 bg-green-500 text-background rounded-xl font-semibold hover:bg-green-400 transition-all duration-150 ease-out shadow-lg hover:shadow-xl hover:scale-105 border border-green-400/20"
                >
                  Ver todos nuestros trabajos
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Contador de proyectos premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-center pt-12"
      >
        <div className="relative inline-flex items-center gap-6 md:gap-8 px-8 md:px-12 py-6 md:py-8 rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-black/30 overflow-hidden">
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear"
            }}
          />
          
          {activeFilters.length === 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-1 text-center">
                  {projects.length}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium text-center">Proyectos realizados</div>
              </motion.div>
              
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent relative z-10"></div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent mb-1 text-center">
                  {Object.keys(groupedProjects).length}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium text-center">Especialidades</div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent mb-1 text-center">
                  {filteredProjects.length}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium text-center">Proyectos filtrados</div>
              </motion.div>
              
              <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent relative z-10"></div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-1 text-center">
                  {projects.length}
                </div>
                <div className="text-xs md:text-sm text-gray-400 font-medium text-center">Total SoMoS</div>
              </motion.div>
            </>
          )}
          
          {/* Partículas decorativas */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-emerald-400 rounded-full opacity-60"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectsGrid;