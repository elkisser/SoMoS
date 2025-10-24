import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ProjectFilters = ({ onFilterChange, activeFilters }) => {
  const categories = [
    { id: 'desarrollo-web', name: 'Web', icon: '🌐' },
    { id: 'apps-moviles', name: 'Móvil', icon: '📱' },
    { id: 'branding', name: 'Branding', icon: '🎨' }
  ];

  const handleToggle = (categoryId) => {
    const newFilters = activeFilters.includes(categoryId)
      ? activeFilters.filter(filter => filter !== categoryId)
      : [...activeFilters, categoryId];
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      {/* Filtros ultra compactos y premium con colores de tu marca */}
      <div className="flex flex-col items-center gap-4">
        {/* Contenedor principal de filtros */}
        <motion.div
          className="relative inline-flex bg-nav/80 backdrop-blur-xl border border-gray-600/40 rounded-2xl p-1.5 gap-1 shadow-2xl shadow-black/30"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {categories.map((category, index) => {
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
                  damping: 30, 
                  delay: index * 0.1 
                }}
                className={`
                  relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-primary/40 group min-w-[90px]
                  ${isActive 
                    ? 'text-white shadow-lg shadow-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                  }
                `}
                whileHover={{ 
                  scale: 1.08,
                  transition: { type: "spring", stiffness: 500 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Fondo verde premium para estado activo - RESPETANDO TUS COLORES */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-600 rounded-xl shadow-inner"
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ 
                      scale: isActive ? [1, 1.4, 1.1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-sm"
                  >
                    {category.icon}
                  </motion.span>
                  <span className="tracking-tight">{category.name}</span>
                  
                  {/* Indicador sutil de selección múltiple */}
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 bg-white rounded-full ml-1"
                    />
                  )}
                </span>

                {/* Efecto de borde sutil en hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-white/5"
                  transition={{ duration: 0.2 }}
                />

                {/* Efecto de brillo sutil en activo */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Indicador de filtros activos - Ultra minimalista y premium */}
        <AnimatePresence>
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="flex items-center gap-3"
            >
              {/* Badge premium verde - RESPETANDO TUS COLORES */}
              <motion.div
                className="flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-2 backdrop-blur-sm"
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
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                {activeFilters.map((filterId, index) => {
                  const category = categories.find(cat => cat.id === filterId);
                  return (
                    <motion.div
                      key={filterId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-3 py-1"
                    >
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

      {/* Efectos de partículas sutiles verdes - RESPETANDO TUS COLORES */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary/30 rounded-full"
            initial={{ 
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
            style={{
              left: `${45 + (Math.random() * 10)}%`,
              top: `${50 + (Math.random() * 10 - 5)}%`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectFilters;