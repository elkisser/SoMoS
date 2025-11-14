import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink, ShoppingCart, Zap, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFeaturedProjects, getProjectsStats } from '../utils/projects-data';

const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [featuredProjects] = useState(() => getFeaturedProjects());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        setDimensions({ 
          width: window.innerWidth, 
          height: window.innerHeight 
        });
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
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
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-16 md:pt-0">
      {/* Fondo */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      
      {/* Efectos de Partículas - Optimizado para móvil */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 6 : 15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern más sutil en móvil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="container mx-auto px-4 md:px-6 pb-16 md:py-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Columna Izquierda - Contenido Principal */}
          <div className="flex-1 text-center lg:text-left max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-6"
            >
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-primary text-xs font-medium">Soluciones que generan resultados</span>
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
              transition={{ duration: 0.8, delay: 0.2 }}
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
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-12"
            >
              <motion.a
                href="/trabajos"
                className="btn-primary inline-flex items-center justify-center gap-2 group px-5 py-3 text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Proyectos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="/contacto"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold border border-gray-600 rounded-lg transition-all duration-200 hover:border-primary/50 hover:scale-105 active:scale-95"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Zap className="w-4 h-4" />
                Comenzar ahora
              </motion.a>
            </motion.div>

            {/* Stats compactas para móvil */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
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
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 group-hover:border-primary/30 transition-all duration-300">
                    <div className="text-2xl mb-1 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-xl font-bold text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-xs font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Columna Derecha - Proyectos Destacados (Oculta en móviles pequeños) */}
          {!isMobile && (
            <div className="flex-1 max-w-md w-full">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
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
                    className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-lg rounded-2xl border border-primary/30 overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer block"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs border border-white/20">
                        <ExternalLink className="w-3 h-3" />
                        <span>Ver proyecto</span>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 z-20">
                      <div className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-semibold border border-primary/30">
                        <ShoppingCart className="w-3 h-3" />
                        <span>{getMainTag(layout.mainProject)}</span>
                      </div>
                    </div>

                    <div className="absolute top-12 left-3 z-20">
                      <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs border border-yellow-500/30">
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
                        className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer block"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-black/60 backdrop-blur-md text-white p-1.5 rounded-lg border border-white/20">
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
                              <span className="bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded border border-primary/30">
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
                    className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-semibold"
                    whileHover={{ x: 3 }}
                  >
                    Conversemos sobre tu idea
                    <ArrowRight className="w-3 h-3" />
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