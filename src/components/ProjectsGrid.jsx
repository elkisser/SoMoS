import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkCard from './WorkCard.jsx';
import ProjectFilters from './ProjectFilters.jsx';

const ProjectsGrid = ({ projects }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  // Categorías disponibles
  const categories = {
    'desarrollo-web': { name: 'Desarrollo Web', icon: '🌐' },
    'apps-moviles': { name: 'Apps Móviles', icon: '📱' },
    'branding': { name: 'Branding', icon: '🎨' }
  };

  // Filtrar y agrupar proyectos
  const { filteredProjects, groupedProjects } = useMemo(() => {
    if (activeFilters.length === 0) {
      // Sin filtros: agrupar por categorías
      const grouped = {};
      projects.forEach(project => {
        if (!grouped[project.category]) {
          grouped[project.category] = [];
        }
        grouped[project.category].push(project);
      });
      return { filteredProjects: [], groupedProjects: grouped };
    } else {
      // Con filtros: mostrar solo los filtrados
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
    <>
      <ProjectFilters 
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      
      <AnimatePresence mode="wait">
        {activeFilters.length === 0 ? (
          // Vista agrupada por categorías (sin filtros)
          <div className="space-y-16">
            {Object.entries(groupedProjects).map(([categoryId, categoryProjects], categoryIndex) => (
              <motion.section
                key={categoryId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="space-y-8"
              >
                {/* Header de la categoría */}
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {categories[categoryId]?.icon} {categories[categoryId]?.name}
                  </h3>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Grid de proyectos de esta categoría */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProjects.map((project, index) => (
                    <motion.div
                      key={project.name}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      layout
                    >
                      <WorkCard project={project} index={index} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        ) : (
          // Vista filtrada (con filtros activos)
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  layout
                >
                  <WorkCard project={project} index={index} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="col-span-full text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  No se encontraron proyectos
                </h3>
                <p className="text-gray-400 mb-6">
                  Intenta ajustar los filtros para ver más proyectos
                </p>
                <button
                  onClick={() => setActiveFilters([])}
                  className="px-6 py-3 bg-primary text-background rounded-lg font-semibold hover:bg-primary/80 transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

      {/* Contador de proyectos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-400">
          {activeFilters.length === 0 ? (
            <>
              Mostrando <span className="text-primary font-semibold">{projects.length}</span> proyectos en{' '}
              <span className="text-white font-semibold">{Object.keys(groupedProjects).length}</span> categorías
            </>
          ) : (
            <>
              Mostrando <span className="text-primary font-semibold">{filteredProjects.length}</span> de{' '}
              <span className="text-white font-semibold">{projects.length}</span> proyectos
            </>
          )}
        </p>
      </motion.div>
    </>
  );
};

export default ProjectsGrid;
