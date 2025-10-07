import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Detectar sección activa para highlights
      const sections = ['inicio', 'about', 'services', 'cta'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Inicio', href: '/', section: 'inicio' },
    { name: 'Nosotros', href: '#about', section: 'about' },
    { name: 'Servicios', href: '#services', section: 'services' },
    { name: 'Trabajos', href: '/trabajos' },
    { name: 'Contacto', href: '/contacto', section: 'cta' }
  ];

  const handleNavClick = (href, section) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled 
            ? 'bg-nav/95 backdrop-blur-lg shadow-2xl shadow-black/30 border-b border-primary/10' 
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Logo Mejorado */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-primary">S</span>
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">o</span>
                  <span className="text-primary">M</span>
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">o</span>
                  <span className="text-primary">S</span>
                </span>
                <span className="text-xs text-primary font-medium tracking-wider">
                  DIGITAL
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      handleNavClick(item.href, item.section);
                    }
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-lg font-medium transition-all duration-300",
                    activeSection === item.section
                      ? "text-primary"
                      : "text-gray-300 hover:text-white"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.name}
                  {activeSection === item.section && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
              
              {/* CTA Button */}
              <motion.a
                href="/contacto"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-background rounded-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                Hablemos
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg border border-gray-600 hover:border-primary/50 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden pt-20"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-80 bg-nav border-l border-gray-700 shadow-2xl"
            >
              <div className="p-6">
                {/* Logo en Mobile */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-700">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold">
                    <span className="text-primary">S</span>
                    <span className="text-white">o</span>
                    <span className="text-primary">M</span>
                    <span className="text-white">o</span>
                    <span className="text-primary">S</span>
                  </span>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        if (item.href.startsWith('#')) {
                          e.preventDefault();
                          handleNavClick(item.href, item.section);
                        }
                      }}
                      className={cn(
                        "block px-4 py-3 rounded-lg font-medium transition-all duration-300 border-l-2",
                        activeSection === item.section
                          ? "text-primary bg-primary/10 border-primary"
                          : "text-gray-300 border-transparent hover:text-white hover:bg-white/5"
                      )}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                {/* CTA Button Mobile */}
                <motion.a
                  href="/contacto"
                  className="block w-full mt-6 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-background rounded-lg font-semibold text-center shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hablemos
                </motion.a>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="mt-8 pt-6 border-t border-gray-700"
                >
                  <p className="text-sm text-gray-400 mb-2">¿Preguntas?</p>
                  <a 
                    href="mailto:hola@somos.com" 
                    className="text-primary hover:underline text-sm"
                  >
                    hola@somos.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;