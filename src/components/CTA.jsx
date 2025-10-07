import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Mail, Calendar } from 'lucide-react';

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Chat Directo',
      description: 'Hablemos por WhatsApp',
      action: 'Iniciar Chat',
      href: 'https://wa.me/tunumero'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Envíanos un correo',
      action: 'Enviar Email',
      href: 'mailto:hola@somos.com'
    },
    {
      icon: Calendar,
      title: 'Reunión',
      description: 'Agenda una llamada',
      action: 'Programar',
      href: '/contacto'
    }
  ];

  return (
    <section ref={ref} id="cta" className="py-20 bg-gradient-to-br from-nav to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para <span className="text-primary">transformar</span> tu negocio?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tomemos un café virtual y hablemos sobre cómo podemos ayudarte a alcanzar tus objetivos digitales.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 bg-background rounded-xl border border-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">
                {method.title}
              </h3>
              
              <p className="text-gray-400 mb-4 text-sm">
                {method.description}
              </p>
              
              <span className="text-primary font-semibold text-sm group-hover:underline">
                {method.action} →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">Confían en nosotros</p>
          <div className="flex justify-center items-center gap-8 opacity-50">
            {['Tech', 'Startups', 'Empresas', 'Agencias'].map((item, index) => (
              <div key={index} className="text-gray-400 font-medium">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;