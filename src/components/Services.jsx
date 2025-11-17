import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Smartphone, Rocket, Sparkles } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Globe,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos y responsivos con las últimas tecnologías.',
      features: ['PHP/Symfony', 'React/Next.js', 'Astro', 'Tailwind CSS', 'TypeScript', 'HTML5', 'CSS3', 'JavaScript', 'MySQL', 'APIs REST'],
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Aplicaciones nativas e híbridas para iOS y Android.',
      features: ['React Native', 'Flutter', 'UI/UX Design'],
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Rocket,
      title: 'Branding',
      description: 'Desarrollo de identidad visual y estrategia de marca.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Content Strategy'],
      gradient: 'from-emerald-500 to-green-400'
    },
  ];

  return (
    <section ref={ref} id="services" className="py-20 md:py-28 bg-background relative overflow-visible">
      {/* Efectos de fondo premium */}
      <div className="absolute inset-0 -z-10 overflow-visible">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16 md:mb-24 space-y-8"
        >
          {/* Badge Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
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
              Servicios SoMoS
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Servicios
            </span>
          </h2>

          {/* Línea decorativa */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center justify-center gap-4 max-w-md mx-auto"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary"></div>
          </motion.div>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Ofrecemos{' '}
            <span className="text-primary font-semibold">soluciones integrales</span> para llevar tu presencia digital 
            al{' '}
            <span className="text-emerald-400 font-semibold">siguiente nivel</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8,
                  transition: { type: "tween", duration: 0.15, ease: "easeOut" }
                }}
                className="group relative"
              >
                {/* Card con glassmorphism */}
                <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-300 ease-out shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10 h-full flex flex-col">
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                  
                  {/* Contenido */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Icono premium */}
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 mb-6 group-hover:from-primary/30 group-hover:to-emerald-500/30 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { type: "tween", duration: 0.15, ease: "easeOut" }
                      }}
                    >
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                    </motion.div>
                    
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base flex-grow">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2.5">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center gap-2.5 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Partículas decorativas */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
