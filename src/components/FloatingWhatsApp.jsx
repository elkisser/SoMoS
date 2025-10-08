import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  const phoneNumber = "3435086453"; // Reemplaza con tu número
  
  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-primary text-background p-4 rounded-full shadow-lg hover:shadow-primary/30 shadow-primary/20 transition-all duration-300"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
};

export default FloatingWhatsApp;