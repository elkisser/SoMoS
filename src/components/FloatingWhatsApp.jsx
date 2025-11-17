import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';

const FloatingWhatsApp = () => {
  const phoneNumber = "3435086453";
  
  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, rotate: -180 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] group"
    >
      {/* Card premium con glassmorphism */}
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/20 group-hover:border-primary/30 group-hover:shadow-primary/30 transition-all duration-300 overflow-hidden">
        {/* Efecto de brillo animado */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
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
        
        {/* Icono */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity 
            }}
          >
            <MessageCircle className="w-7 h-7 text-primary" />
          </motion.div>
        </div>

        {/* Partículas decorativas */}
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge de notificación animado */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-primary to-emerald-500 rounded-full border-2 border-gray-900 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity 
          }}
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.5, 1],
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity 
            }}
          />
        </motion.div>
      </div>

      {/* Tooltip premium */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-primary/20 text-white text-xs font-medium whitespace-nowrap shadow-lg shadow-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        Hablemos por WhatsApp
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-primary/20"></div>
      </motion.div>
    </motion.a>
  );
};

export default FloatingWhatsApp;
