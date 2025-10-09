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
    <footer className="bg-nav border-t border-gray-700/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
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
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-tight">
                    SoMoS
                  </span>
                  <span className="text-xs text-primary font-medium tracking-wider">
                    ENV
                  </span>
                </div>
              </div>

              <p className="text-gray-400 mb-6 leading-relaxed max-w-xs">
                Creamos experiencias digitales únicas que transforman ideas en realidades impactantes.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 bg-background border border-gray-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:scale-110",
                      social.color
                    )}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <social.icon className="w-4 h-4 text-gray-400" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
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
            >
              <h3 className="text-lg font-semibold text-white mb-6">Servicios</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <span className="text-gray-400 hover:text-primary transition-colors duration-300 flex items-center gap-2 group cursor-default">
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full"></div>
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
            >
              <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">Santa Fe, Santa Fe, Argentina</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm">+54 343 508-6453</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:hola@somos.com" className="text-sm hover:text-primary transition-colors duration-300">
                    somos.env@gmail.com
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <motion.a
                href="/contacto"
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-background rounded-lg font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Comenzar Proyecto
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700/50 py-6"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} SoMoS Digital. Todos los derechos reservados.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 opacity-5">
        <Sparkles className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute top-10 left-10 opacity-5">
        <Sparkles className="w-16 h-16 text-primary" />
      </div>
    </footer>
  );
};

export default Footer;