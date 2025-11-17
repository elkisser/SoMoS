import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Mail, Calendar, Sparkles, ArrowRight } from 'lucide-react';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Chat Directo',
      description: 'Hablemos por WhatsApp',
      action: 'Iniciar Chat',
      href: 'https://wa.me/3435086453',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Envíanos un correo',
      action: 'Enviar Email',
      href: 'mailto:somos.env@gmail.com',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Reunión',
      description: 'Agenda una llamada',
      action: 'Programar',
      href: '/contacto',
      gradient: 'from-emerald-500 to-green-400'
    }
  ];

  return (
    <section ref={ref} id="cta" className="py-20 md:py-28 bg-gradient-to-br from-nav to-background relative overflow-visible">
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
              Contacto SoMoS
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            ¿Listo para{' '}
            <span className="bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              transformar
            </span>{' '}
            tu negocio?
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

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
            Tomemos un{' '}
            <span className="text-primary font-semibold">café virtual</span> y hablemos sobre cómo podemos 
            ayudarte a alcanzar tus{' '}
            <span className="text-emerald-400 font-semibold">objetivos digitales</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : '_self'}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : ''}
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
                className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 text-center overflow-hidden cursor-pointer"
              >
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
                  
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm md:text-base">
                    {method.description}
                  </p>
                  
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base group-hover:gap-3 transition-all duration-300">
                    {method.action}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Partículas decorativas */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </motion.a>
            );
          })}
        </div>

        {/* Trust Badges Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-gray-400 mb-6 text-sm md:text-base">Confían en nosotros</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {['Tech', 'Startups', 'Empresas', 'Agencias'].map((item, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 text-gray-400 font-medium text-sm md:text-base hover:border-primary/30 hover:text-primary transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
