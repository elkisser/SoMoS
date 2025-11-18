import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Users, Sparkles } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const features = [
    {
      icon: Code2,
      title: 'Desarrollo Avanzado',
      description: 'Tecnologías modernas y mejores prácticas para aplicaciones escalables y eficientes.',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      icon: Palette,
      title: 'Diseño Impactante',
      description: 'Interfaces intuitivas y atractivas que cautivan a tus usuarios desde el primer vistazo.',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Rendimiento Óptimo',
      description: 'Sitios web ultrarrápidos que mejoran la experiencia de usuario y el SEO.',
      gradient: 'from-emerald-500 to-green-400'
    },
    {
      icon: Users,
      title: 'Enfoque Cliente',
      description: 'Trabajamos codo a codo contigo para entender y superar tus expectativas.',
      gradient: 'from-primary to-emerald-400'
    }
  ];

  return (
    <section ref={ref} id="about" className="py-20 md:py-28 bg-nav/50 relative overflow-visible">
      {/* Efectos de fondo premium */}
      <div className="absolute inset-0 -z-10 overflow-visible">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
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
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 border border-primary/20 backdrop-blur-xl shadow-lg shadow-primary/5"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
              Sobre SoMoS
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            ¿Por qué elegir{' '}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              SoMoS
            </span>
            ?
          </h2>

          {/* Línea decorativa */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 max-w-md mx-auto"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/50 to-primary"></div>
            <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/50 to-primary"></div>
          </motion.div>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Somos más que una agencia de desarrollo. Somos tu{' '}
            <span className="text-primary font-semibold">partner tecnológico</span>, 
            comprometido con transformar tus{' '}
            <span className="text-emerald-400 font-semibold">ideas</span> en soluciones digitales 
            que marquen la{' '}
            <span className="text-primary font-semibold">diferencia</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.4,
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
                <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 transition-all duration-300 ease-out shadow-lg shadow-black/20 group-hover:shadow-xl group-hover:shadow-primary/10 h-full">
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                  
                  {/* Contenido */}
                  <div className="relative z-10">
                    {/* Icono premium */}
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 mb-4 group-hover:from-primary/30 group-hover:to-emerald-500/30 transition-all duration-300"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { type: "tween", duration: 0.15, ease: "easeOut" }
                      }}
                    >
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    </motion.div>
                    
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Partículas decorativas */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="relative mt-16 md:mt-24 text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-black/30 overflow-hidden"
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent">
              ¿Listo para comenzar tu proyecto?
            </h3>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Contáctanos hoy mismo y hagamos realidad tu visión digital.
            </p>
            <motion.a
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary via-emerald-500 to-primary text-background rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 text-base md:text-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Hablemos
            </motion.a>
          </div>

          {/* Partículas decorativas */}
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-emerald-400 rounded-full opacity-60"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
