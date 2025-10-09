import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Globe, Smartphone, Rocket } from 'lucide-react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Globe,
      title: 'Desarrollo Web',
      description: 'Sitios web modernos y responsivos con las últimas tecnologías.',
      features: ['PHP/Symfony', 'React/Next.js', 'Astro', 'Tailwind CSS', 'TypeScript', 'HTML5', 'CSS3', 'JavaScript', 'MySQL', 'MongoDB', 'Git', 'GitHub']
    },
    {
      icon: Smartphone,
      title: 'Apps Móviles',
      description: 'Aplicaciones nativas e híbridas para iOS y Android.',
      features: ['React Native', 'Flutter', 'UI/UX Design']
    },
    {
      icon: Rocket,
      title: 'Branding',
      description: 'Desarrollo de identidad visual y estrategia de marca.',
      features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Content Strategy']
    },
  ];

  return (
    <section ref={ref} id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos soluciones integrales para llevar tu presencia digital al siguiente nivel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 bg-nav rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;