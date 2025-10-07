import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Palette, Zap, Users } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Code2,
      title: 'Desarrollo Avanzado',
      description: 'Tecnologías modernas y mejores prácticas para aplicaciones escalables y eficientes.'
    },
    {
      icon: Palette,
      title: 'Diseño Impactante',
      description: 'Interfaces intuitivas y atractivas que cautivan a tus usuarios desde el primer vistazo.'
    },
    {
      icon: Zap,
      title: 'Rendimiento Óptimo',
      description: 'Sitios web ultrarrápidos que mejoran la experiencia de usuario y el SEO.'
    },
    {
      icon: Users,
      title: 'Enfoque Cliente',
      description: 'Trabajamos codo a codo contigo para entender y superar tus expectativas.'
    }
  ];

  return (
    <section ref={ref} id="about" className="py-20 bg-nav/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Por qué elegir <span className="text-primary">S</span>o<span className="text-primary">M</span>o<span className="text-primary">S</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Somos más que una agencia de desarrollo. Somos tu partner tecnológico, 
            comprometido con transformar tus ideas en soluciones digitales que marquen la diferencia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 bg-background rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para comenzar tu proyecto?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contáctanos hoy mismo y hagamos realidad tu visión digital.
          </p>
          <a
            href="/contacto"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-lg"
          >
            Hablemos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;