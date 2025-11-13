import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ExternalLink, ShoppingCart, Zap, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFeaturedProjects, getProjectsStats } from '../utils/projects-data';

const Hero = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    }
  }, []);

  const featuredProjects = getFeaturedProjects();
  const stats = getProjectsStats();

  // Lógica SIMPLE y DIRECTA para destacar The Cookie Box
  const getProjectLayout = (projects) => {
    // Buscar The Cookie Box específicamente
    const cookieBox = projects.find(project => 
      project.name.toLowerCase().includes('cookie box') || 
      project.name.toLowerCase().includes('the cookie box')
    );
    
    // Los otros proyectos featured (excluyendo Cookie Box)
    const otherProjects = projects.filter(project => project !== cookieBox).slice(0, 2);
    
    return { 
      mainProject: cookieBox || projects[0], // Si no encuentra Cookie Box, usa el primero
      otherProjects: otherProjects 
    };
  };

  // Función para obtener el tag más representativo del proyecto
  const getMainTag = (project) => {
    const tags = project.tags;
    
    // Priorizar tags que representen complejidad/comercio
    if (tags.some(tag => tag.toLowerCase().includes('e-commerce'))) return 'E-commerce';
    if (tags.some(tag => tag.toLowerCase().includes('firebase'))) return 'Firebase';
    if (tags.some(tag => tag.toLowerCase().includes('react'))) return 'React App';
    if (tags.some(tag => tag.toLowerCase().includes('next.js'))) return 'Next.js';
    if (tags.some(tag => tag.toLowerCase().includes('tensorflow'))) return 'IA';
    if (tags.some(tag => tag.toLowerCase().includes('branding'))) return 'Branding';
    
    // Default al primer tag sin emoji
    const firstTag = tags[0]?.replace(/^[^\w\s]+\s/, '') || 'Web';
    return firstTag.length > 12 ? firstTag.substring(0, 12) + '...' : firstTag;
  };

  const layout = getProjectLayout(featuredProjects);

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Fondo característico */}
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      
      {/* Efectos de Partículas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Columna Izquierda - Contenido Principal */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Soluciones que generan resultados</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
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
              className="text-lg text-gray-300 mb-6 leading-relaxed"
            >
              Desarrollamos <span className="text-primary font-semibold">experiencias digitales que venden</span>. 
              Desde tiendas online que convierten hasta marcas que enamoran, 
              creamos lo que tu negocio necesita para destacar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <motion.a
                href="/trabajos"
                className="btn-primary inline-flex items-center gap-2 group px-6 py-3 text-base rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver casos de éxito
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
              
              <motion.a
                href="/contacto"
                className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-base border rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-4 h-4" />
                Comenzar ahora
              </motion.a>
            </motion.div>

            {/* Stats Premium con Íconos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              {[
                { 
                  number: `${stats.total}+`, 
                  label: 'Proyectos entregados', 
                  icon: '🚀',
                  gradient: 'from-green-500 to-emerald-400'
                },
                { 
                  number: `${stats.web}+`, 
                  label: 'Aplicaciones web', 
                  icon: '🌐',
                  gradient: 'from-green-500 to-emerald-400'
                },
                { 
                  number: `${stats.branding}+`, 
                  label: 'Clientes satisfechos', 
                  icon: '🎨',
                  gradient: 'from-green-500 to-emerald-400'
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left group relative"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative flex items-center gap-3 p-3 rounded-2xl backdrop-blur-sm border border-gray-700/50 group-hover:border-primary/30 transition-all duration-300 overflow-hidden">
                    {/* Fondo base semitransparente */}
                    <div className="absolute inset-0 bg-gray-800/20"></div>
                    
                    {/* Fondo similar a la hero - gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
                    
                    {/* Patrón de grid sutil (como en la hero) */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"></div>
                    
                    {/* Contenido */}
                    <div className="relative z-10 flex items-center gap-3 w-full">
                      <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div>
                        <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          {stat.number}
                        </div>
                        <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Columna Derecha - Proyectos Destacados */}
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

              {/* Proyecto Principal (The Cookie Box) */}
              {layout.mainProject && (
                <motion.a
                  href={layout.mainProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 0.6, scale: 1 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-lg rounded-2xl border border-primary/30 overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer block"
                  onMouseEnter={() => setHoveredProject(layout.mainProject.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Indicador de enlace externo - aparece en hover */}
                  <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs border border-white/20">
                      <ExternalLink className="w-3 h-3" />
                      <span>Ver proyecto</span>
                    </div>
                  </div>

                  {/* Badge del tag principal */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-semibold border border-primary/30">
                      <ShoppingCart className="w-3 h-3" />
                      <span>{getMainTag(layout.mainProject)}</span>
                    </div>
                  </div>

                  {/* Badge Destacado */}
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

              {/* Grid para los otros proyectos */}
              {layout.otherProjects.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {layout.otherProjects.map((project, index) => (
                    <motion.a
                      key={project.name}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0.6, y: 20 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{
                        y: { duration: 0.6, delay: 0.7 + (index * 0.1) },
                        opacity: { duration: 0.3 }
                      }}
                      className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-primary/30 transition-all duration-300 cursor-pointer block"
                      onMouseEnter={() => setHoveredProject(project.name)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      {/* Indicador de enlace externo - aparece en hover */}
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

              {/* CTA comercial */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
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
        </div>
      </div>
    </section>
  );
};

export default Hero;