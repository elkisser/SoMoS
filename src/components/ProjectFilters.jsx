import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

const ProjectFilters = ({ onFilterChange, activeFilters, categories }) => {
  const handleToggle = (categoryId) => {
    const newFilters = activeFilters.includes(categoryId)
      ? activeFilters.filter(filter => filter !== categoryId)
      : [...activeFilters, categoryId];
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  const categoryList = [
    { id: 'desarrollo-web', name: 'Web', icon: '🌐', ...categories['desarrollo-web'] },
    { id: 'apps-moviles', name: 'Móvil', icon: '📱', ...categories['apps-moviles'] },
    { id: 'branding', name: 'Branding', icon: '🎨', ...categories['branding'] }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-12 md:mb-16 relative overflow-hidden"
    >
      {/* Efectos de fondo premium - contenido dentro del contenedor */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Filtros premium con glassmorphism */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Contenedor principal de filtros premium */}
        <motion.div
          className="relative inline-flex bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 rounded-2xl p-1.5 gap-1.5 shadow-2xl shadow-black/30 overflow-hidden"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-2xl"
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

          {categoryList.map((category, index) => {
            const isActive = activeFilters.includes(category.id);
            return (
              <motion.button
                key={category.id}
                onClick={() => handleToggle(category.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30
                }}
                className={`
                  relative px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-primary/40 group min-w-[100px] overflow-hidden
                  ${isActive 
                    ? 'text-white shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-white'
                  }
                `}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 500 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Fondo premium para estado activo */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-500 to-primary rounded-xl shadow-inner"
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  >
                    {/* Efecto de brillo en activo */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                )}
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ 
                      scale: isActive ? [1, 1.4, 1.1] : 1,
                      rotate: isActive ? [0, 10, -10, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-base"
                  >
                    {category.icon}
                  </motion.span>
                  <span className="tracking-tight">{category.name}</span>
                  
                  {/* Indicador de selección */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 bg-white rounded-full ml-1"
                    />
                  )}
                </span>

                {/* Efecto de borde en hover */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-primary/20"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Indicador de filtros activos premium */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="flex items-center gap-3"
            >
              {/* Badge premium */}
              <motion.div
                className="flex items-center gap-2 bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 rounded-full px-4 py-2 shadow-lg shadow-primary/10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
                <span className="text-white text-sm font-medium">
                  {activeFilters.length} filtro{activeFilters.length > 1 ? 's' : ''} activo{activeFilters.length > 1 ? 's' : ''}
                </span>
                
                <motion.button
                  onClick={clearFilters}
                  className="text-primary hover:text-emerald-300 transition-colors duration-200 ml-1"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  title="Limpiar todos los filtros"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Indicadores de filtros activos individuales */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                {activeFilters.map((filterId, index) => {
                  const category = categoryList.find(cat => cat.id === filterId);
                  return (
                    <motion.div
                      key={filterId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center gap-1 bg-gradient-to-br from-primary/20 to-emerald-500/20 backdrop-blur-sm border border-primary/30 rounded-full px-3 py-1"
                    >
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-primary text-xs font-medium">
                        {category?.name}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectFilters;
