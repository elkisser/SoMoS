import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // Detectar scroll para efecto visual
      setScrolled(window.scrollY > 60);
      
      // Solo detectar secciones si estamos en la página principal
      const pathname = window.location.pathname;
      if (pathname === '/' || pathname === '') {
        const sections = ['inicio', 'about', 'services', 'trabajos', 'contacto'];
        let currentActive = 'inicio';
        
        sections.forEach(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Más tolerancia para mejor detección
            if (rect.top <= 200 && rect.bottom >= 200) {
              currentActive = section;
            }
          }
        });
        
        // Detectar si hemos pasado la sección de servicios
        const servicesElement = document.getElementById('services');
        if (servicesElement) {
          const rect = servicesElement.getBoundingClientRect();
          if (rect.top < 0 && rect.bottom < window.innerHeight * 0.5) {
            currentActive = 'services';
          }
        }
        
        setActiveSection(currentActive);
      }
    };

    // Configurar observer para mejor detección
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (window.location.pathname === '/' || window.location.pathname === '')) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observar las secciones
    const sectionsToObserve = ['inicio', 'about', 'services'];
    sectionsToObserve.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navigationItems = [
    { name: 'Inicio', href: '#inicio', section: 'inicio' },
    { name: 'Nosotros', href: '#about', section: 'about' },
    { name: 'Servicios', href: '#services', section: 'services' },
    { name: 'Trabajos', href: '/trabajos' },
    { name: 'Contacto', href: '/contacto' }
  ];

  const handleNavClick = (href, section) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        const offset = 80; // Compensar altura de navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e) => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setActiveSection('inicio');
    }
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
            ? 'bg-nav/95 backdrop-blur-lg shadow-2xl shadow-black/30 border-b border-primary/10 py-2' 
            : 'bg-transparent py-4'
        )}
        style={{ zIndex: 1000 }} // Asegurar z-index alto
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogoClick}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <img 
                  src="/logo_render.png" 
                  alt="Logo SoMoS" 
                  className="w-6 h-6 md:w-8 md:h-8 rounded-lg z-10" 
                />
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-xl z-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight">
                  <span className="text-primary">S</span>
                  <span className="text-white">o</span>
                  <span className="text-primary">M</span>
                  <span className="text-white">o</span>
                  <span className="text-primary">S</span>
                </span>
                <span className="text-xs text-primary font-medium tracking-wider">
                  ENV
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
                    } else if (item.href === '/') {
                      e.preventDefault();
                      handleLogoClick(e);
                    }
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm",
                    activeSection === item.section
                      ? "text-primary"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
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
                className="ml-4 px-6 py-2 bg-gradient-to-r from-primary to-primary/80 text-background rounded-lg font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 text-sm"
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
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 bg-nav border-l border-gray-700 shadow-2xl lg:hidden"
            >
              <div className="p-6 pt-20 h-full overflow-y-auto">
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
                        "block px-4 py-3 rounded-lg font-medium transition-all duration-300 border-l-2 text-base",
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
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    somos.env@gmail.com
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;