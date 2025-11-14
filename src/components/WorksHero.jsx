import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Award, Zap } from 'lucide-react';

const WorksHero = ({ projectsCount }) => {
  const stats = [
    {
      number: `${projectsCount}+`,
      label: 'Proyectos Entregados',
      icon: TrendingUp,
      gradient: 'from-emerald-400 to-green-500',
      delay: 0
    },
    {
      number: '100%',
      label: 'Clientes Satisfechos',
      icon: Award,
      gradient: 'from-green-400 to-emerald-500',
      delay: 0
    },
    {
      number: '3',
      label: 'Áreas de Especialización',
      icon: Zap,
      gradient: 'from-emerald-500 to-green-400',
      delay: 0
    }
  ];

  return (
    <div className="relative text-center mb-24 md:mb-32 space-y-12">
      {/* Efectos de fondo premium */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-8"
      >
        {/* Badge Premium con glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/5"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-semibold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
            Portfolio SoMoS
          </span>
        </motion.div>
        
        {/* Título con efecto de gradiente animado */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="block mb-2">Nuestros</span>
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
            Trabajos
          </span>
        </motion.h1>
        
        {/* Línea decorativa mejorada */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-4 max-w-md mx-auto"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary"></div>
          <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary"></div>
        </motion.div>
        
        {/* Descripción premium */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
        >
          Donde las <span className="text-primary font-semibold">ideas</span> toman forma. 
          En SoMoS transformamos <span className="text-emerald-400 font-semibold">visiones</span> en realidades digitales 
          que impulsan negocios y crean experiencias <span className="text-primary font-semibold">memorables</span>.
        </motion.p>
      </motion.div>

      {/* Stats Premium con glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-wrap justify-center gap-6 md:gap-12 pt-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: stat.delay, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { type: "tween", duration: 0.15, ease: "easeOut" }
              }}
              className="group relative"
            >
              {/* Card con glassmorphism */}
              <div className="relative px-8 py-6 rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-150 ease-out shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10">
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"></div>
                
                {/* Contenido */}
                <div className="relative z-10 text-center">
                  {/* Icono animado */}
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 mb-4"
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -10, 10, 0],
                      transition: { type: "tween", duration: 0.15, ease: "easeOut" }
                    }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  
                  {/* Número con gradiente - Centrado */}
                  <div className="flex items-center justify-center mb-2">
                    <motion.div
                      className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent text-center`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: stat.delay,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {stat.number}
                    </motion.div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-gray-400 text-sm font-medium text-center">
                    {stat.label}
                  </div>
                </div>

                {/* Partículas decorativas */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out"></div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WorksHero;

