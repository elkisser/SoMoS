import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink, ShoppingCart, Zap, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFeaturedProjects, getProjectsStats } from '../utils/projects-data';

const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [featuredProjects] = useState(() => getFeaturedProjects());
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof globalThis.window !== 'undefined') {
      const checkMobile = () => {
        const mobile = globalThis.window.innerWidth < 768;
        setIsMobile(mobile);
        setDimensions({ 
          width: globalThis.window.innerWidth, 
          height: globalThis.window.innerHeight 
        });
      };
      
      checkMobile();
      globalThis.window.addEventListener('resize', checkMobile);
      return () => globalThis.window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const stats = getProjectsStats();

  const getProjectLayout = (projects) => {
    const cookieBox = projects.find(project => 
      project.name.toLowerCase().includes('cookie box') || 
      project.name.toLowerCase().includes('the cookie box')
    );
    
    const otherProjects = projects.filter(project => project !== cookieBox).slice(0, 2);
    
    return { 
      mainProject: cookieBox || projects[0],
      otherProjects: otherProjects 
    };
  };

  const getMainTag = (project) => {
    const tags = project.tags;
    
    if (tags.some(tag => tag.toLowerCase().includes('e-commerce'))) return 'E-commerce';
    if (tags.some(tag => tag.toLowerCase().includes('firebase'))) return 'Firebase';
    if (tags.some(tag => tag.toLowerCase().includes('react'))) return 'React App';
    if (tags.some(tag => tag.toLowerCase().includes('next.js'))) return 'Next.js';
    if (tags.some(tag => tag.toLowerCase().includes('tensorflow'))) return 'IA';
    if (tags.some(tag => tag.toLowerCase().includes('branding'))) return 'Branding';
    
    const firstTag = tags[0]?.replace(/^[^\w\s]+\s/, '') || 'Web';
    return firstTag.length > 12 ? firstTag.substring(0, 12) + '...' : firstTag;
  };

  const layout = getProjectLayout(featuredProjects);

  return (
    <section id="inicio" className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative overflow-hidden bg-background -mt-28 pt-28 md:pt-28 pb-0 mb-0">
      {/* Fondo */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      
      {/* Efectos de Partículas - Optimizado para móvil - Solo en cliente */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden">
          {[...new Array(isMobile ? 6 : 15)].map((_, i) => {
            const randomX = Math.random() * dimensions.width;
            const randomY = Math.random() * dimensions.height;
            const randomDuration = 4 + Math.random() * 2;
            const randomDelay = Math.random() * 2;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-primary rounded-full"
                initial={{
                  x: randomX,
                  y: randomY,
                  opacity: 0,
                }}
                animate={{
                  y: [randomY, randomY - 15, randomY],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  delay: randomDelay,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Grid Pattern más sutil en móvil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="container mx-auto px-4 sm:px-6 pb-8 md:pb-12 md:pt-10 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Columna Izquierda - Contenido Principal */}
          <div className="flex-1 text-center lg:text-left max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/5 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-3 h-3 text-primary" />
              </motion.div>
              <span className="text-primary text-xs font-semibold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
                Soluciones que generan resultados
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
            >
              <span className="text-primary">S</span>
              <span className="text-white">o</span>
              <span className="text-primary">M</span>
              <span className="text-white">o</span>
              <span className="text-primary">S</span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                tu ventaja
              </span>
              <br />
              <span className="text-primary">competitiva</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-base md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed"
            >
              Desarrollamos <span className="text-primary font-semibold">experiencias digitales que venden</span>. 
              Desde tiendas online que convierten hasta marcas que enamoran, 
              creamos lo que tu negocio necesita para destacar.
            </motion.p>

            {/* Botones optimizados para móvil */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-12"
            >
              <motion.a
                href="/trabajos"
                className="relative inline-flex items-center justify-center gap-2 group px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary via-emerald-500 to-primary text-background shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Efecto de brillo animado */}
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
                <span className="relative z-10 flex items-center gap-2">
                  Ver Proyectos
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="/contacto"
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/20 hover:border-primary/30 text-white transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-primary/10 overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Comenzar ahora
                </span>
              </motion.a>
            </motion.div>

            {/* Stats compactas para móvil */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0"
            >
              {[
                { 
                  number: `${stats.total}+`, 
                  label: 'Proyectos', 
                  icon: '🚀'
                },
                { 
                  number: `${stats.web}+`, 
                  label: 'Web Apps', 
                  icon: '🌐'
                },
                { 
                  number: `${stats.branding}+`, 
                  label: 'Clientes', 
                  icon: '⭐'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative rounded-xl p-4 bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10 overflow-hidden">
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                      <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-1">
                        {stat.number}
                      </div>
                      <div className="text-gray-400 text-xs font-medium leading-tight">
                        {stat.label}
                      </div>
                    </div>

                    {/* Partículas decorativas */}
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Proyecto Destacado en Móvil */}
          {isMobile && layout.mainProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 w-full"
            >
              <div className="text-center mb-4">
                <h2 className="text-lg font-bold text-white mb-1">
                  Trabajo <span className="text-primary">destacado</span>
                </h2>
                <p className="text-gray-400 text-xs">
                  Ejemplo real de lo que podemos lograr
                </p>
              </div>

              <motion.a
                href={layout.mainProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-primary/20 hover:border-primary/30 overflow-hidden transition-all duration-300 cursor-pointer block shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                <div className="absolute top-3 right-3 z-30">
                  <div className="flex items-center gap-1 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl text-white px-3 py-1.5 rounded-full text-xs border border-primary/20 shadow-lg">
                    <ExternalLink className="w-3 h-3" />
                    <span>Ver</span>
                  </div>
                </div>

                <div className="absolute top-3 left-3 z-20">
                  <div className="flex items-center gap-1 bg-gradient-to-br from-primary/20 to-emerald-500/20 backdrop-blur-sm text-primary px-2.5 py-1.5 rounded-full text-xs font-semibold border border-primary/30">
                    <ShoppingCart className="w-3 h-3" />
                    <span>{getMainTag(layout.mainProject)}</span>
                  </div>
                </div>

                <div className="absolute top-12 left-3 z-20">
                  <div className="flex items-center gap-1 bg-gradient-to-br from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm text-yellow-300 px-2.5 py-1.5 rounded-full text-xs border border-yellow-500/30">
                    <Star className="w-3 h-3" />
                    <span>DESTACADO</span>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden">
                  <video
                    className="w-full h-full object-cover transition-transform duration-700 group-active:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={layout.mainProject.video} type="video/mp4" />
                  </video>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent">
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base font-bold text-white mb-1 group-active:text-primary transition-colors duration-300">
                        {layout.mainProject.name.replace(/^[^\w\s]+\s/, '')}
                      </h3>
                      <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
                        {layout.mainProject.description.split(' ').slice(0, 15).join(' ')}...
                      </p>
                    </div>
                  </div>
                </div>
              </motion.a>

              {/* CTA Móvil */}
              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.a
                  href="/contacto"
                  className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-primary/20 hover:border-primary/30 text-primary hover:text-white transition-all duration-300 text-sm font-semibold group overflow-hidden"
                  whileHover={{ scale: 1.05, x: 3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Conversemos sobre tu idea
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              </motion.div>
            </motion.div>
          )}

          {/* Columna Derecha - Proyectos Destacados (Oculta en móviles pequeños) */}
          {!isMobile && (
            <div className="flex-1 max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="text-center lg:text-left mb-4">
                  <h2 className="text-xl font-bold text-white mb-1">
                    Trabajos <span className="text-primary">destacados</span>
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Ejemplos reales de lo que podemos lograr juntos
                  </p>
                </div>

                {/* Proyecto Principal */}
                {layout.mainProject && (
                  <motion.a
                    href={layout.mainProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl rounded-2xl border border-primary/20 hover:border-primary/30 overflow-hidden transition-all duration-300 cursor-pointer block shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10"
                    whileHover={{ scale: 1.02, y: -4 }}
                  >
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl text-white px-3 py-1.5 rounded-full text-xs border border-primary/20 shadow-lg">
                        <ExternalLink className="w-3 h-3" />
                        <span>Ver proyecto</span>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 z-20">
                      <div className="flex items-center gap-1 bg-gradient-to-br from-primary/20 to-emerald-500/20 backdrop-blur-sm text-primary px-2.5 py-1.5 rounded-full text-xs font-semibold border border-primary/30">
                        <ShoppingCart className="w-3 h-3" />
                        <span>{getMainTag(layout.mainProject)}</span>
                      </div>
                    </div>

                    <div className="absolute top-12 left-3 z-20">
                      <div className="flex items-center gap-1 bg-gradient-to-br from-yellow-500/20 to-yellow-400/20 backdrop-blur-sm text-yellow-300 px-2.5 py-1.5 rounded-full text-xs border border-yellow-500/30">
                        <Star className="w-3 h-3" />
                        <span>DESTACADO</span>
                      </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden">
                      <video
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={layout.mainProject.video} type="video/mp4" />
                      </video>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent">
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-base font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                            {layout.mainProject.name.replace(/^[^\w\s]+\s/, '')}
                          </h3>
                          <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed">
                            {layout.mainProject.description.split(' ').slice(0, 12).join(' ')}...
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                )}

                {/* Proyectos secundarios */}
                {layout.otherProjects.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {layout.otherProjects.map((project, index) => (
                      <motion.a
                        key={project.name}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl rounded-xl border border-primary/10 hover:border-primary/30 overflow-hidden transition-all duration-300 cursor-pointer block shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10"
                        whileHover={{ scale: 1.05, y: -4 }}
                      >
                        {/* Efecto de brillo en hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl text-white p-1.5 rounded-lg border border-primary/20 shadow-lg">
                            <ExternalLink className="w-2.5 h-2.5" />
                          </div>
                        </div>

                        <div className="relative aspect-square overflow-hidden">
                          <video
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            autoPlay
                            muted
                            loop
                            playsInline
                          >
                            <source src={project.video} type="video/mp4" />
                          </video>
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent">
                            <div className="absolute bottom-2 left-2">
                              <span className="bg-gradient-to-br from-primary/20 to-emerald-500/20 backdrop-blur-sm text-primary text-xs px-2 py-1 rounded-full border border-primary/30 font-medium">
                                {getMainTag(project)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          <h3 className="text-xs font-semibold text-white mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {project.name.replace(/^[^\w\s]+\s/, '').split(' ').slice(0, 3).join(' ')}
                          </h3>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <motion.div
                  className="text-center lg:text-left pt-2"
                >
                  <p className="text-gray-400 text-xs mb-2">
                    ¿Listo para tener tu propio proyecto destacado?
                  </p>
                  <motion.a
                    href="/contacto"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-primary/20 hover:border-primary/30 text-primary hover:text-white transition-all duration-300 text-sm font-semibold group"
                    whileHover={{ x: 3, scale: 1.05 }}
                  >
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      Conversemos sobre tu idea
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;