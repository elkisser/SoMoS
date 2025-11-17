import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Twitter,
      href: "https://twitter.com/somos",
      label: "Twitter",
      color: "hover:text-blue-400"
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/3435086453",
      label: "WhatsApp",
      color: "hover:text-green-400"
    },
    {
      icon: Instagram,
      href: "https://instagram.com/somos.env",
      label: "Instagram",
      color: "hover:text-pink-400"
    },
    {
      icon: Mail,
      href: "mailto:somos.env@gmail.com",
      label: "Email",
      color: "hover:text-primary"
    }
  ];

  const quickLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Trabajos', href: '/trabajos' },
    { name: 'Contacto', href: '/contacto' }
  ];

  const services = [
    'Desarrollo Web',
    'Apps Móviles',
    'Branding'
  ];

  return (
    <footer className="relative overflow-visible border-t border-primary/20">
      {/* Efectos de fondo premium */}
      <div className="absolute inset-0 -z-10 overflow-visible">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 md:w-64 md:h-64 bg-emerald-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      {/* Contenedor con glassmorphism */}
      <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Main Footer Content */}
          <div className="py-12 md:py-16">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Brand Column */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                {/* Logo con imagen real y animación detrás */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <img src="/logo_render.png" alt="Logo SoMoS" className="w-8 h-8 rounded-lg z-10" />
                    <motion.div
                      className="absolute inset-0 border-2 border-primary/30 rounded-xl z-0"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
                      SoMoS
                    </span>
                    <span className="text-xs text-primary font-medium tracking-wider">
                      ENV
                    </span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed max-w-xs text-sm md:text-base">
                  Creamos experiencias digitales únicas que transforman ideas en realidades impactantes.
                </p>

                {/* Social Links Premium */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "group relative w-11 h-11 rounded-xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 flex items-center justify-center overflow-hidden",
                        social.color
                      )}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <social.icon className="w-4 h-4 text-gray-400 group-hover:text-primary relative z-10 transition-colors duration-300" />
                      {/* Partícula decorativa */}
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Enlaces Rápidos
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Servicios
                </h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <motion.li
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group cursor-default">
                        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary transition-colors duration-300"></div>
                        {service}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-white mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-400 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-emerald-500/30 transition-all duration-300">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm hover:text-primary transition-colors duration-300">Santa Fe, Santa Fe, Argentina</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-emerald-500/30 transition-all duration-300">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm hover:text-primary transition-colors duration-300">+54 343 508-6453</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-emerald-500/30 transition-all duration-300">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <a href="mailto:somos.env@gmail.com" className="text-sm hover:text-primary transition-colors duration-300">
                      somos.env@gmail.com
                    </a>
                  </div>
                </div>

                {/* CTA Button Premium */}
                <motion.a
                  href="/contacto"
                  className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-primary via-emerald-500 to-primary text-background rounded-xl font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 relative overflow-hidden group"
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
                  <span className="relative z-10">Comenzar Proyecto</span>
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Bar Premium */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-primary/20 py-6"
          >
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} SoMoS Digital. Todos los derechos reservados.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements Premium */}
        <div className="absolute bottom-10 right-10 opacity-10">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity }
            }}
          >
            <Sparkles className="w-24 h-24 text-primary" />
          </motion.div>
        </div>
        <div className="absolute top-10 left-10 opacity-10">
          <motion.div
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity }
            }}
          >
            <Sparkles className="w-16 h-16 text-primary" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
