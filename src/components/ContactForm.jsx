import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, User, Mail, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Enviar datos a la función serverless
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Éxito: mostrar mensaje de confirmación
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset form after success
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        // Error: mostrar mensaje de error
        console.error('Error enviando formulario:', result.error);
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o contáctanos directamente.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputFields = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Nombre Completo',
      placeholder: 'Tu nombre completo',
      icon: User,
      required: true
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'tu@email.com',
      icon: Mail,
      required: true
    },
    {
      id: 'message',
      name: 'message',
      type: 'textarea',
      label: 'Mensaje',
      placeholder: 'Cuéntanos sobre tu proyecto, ideas, presupuesto y timeline...',
      icon: MessageSquare,
      required: true,
      rows: 6
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="max-w-4xl mx-auto px-4 md:px-6"
    >

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="relative text-center p-12 md:p-16 rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-black/30 overflow-hidden"
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl md:text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-emerald-400 to-primary bg-clip-text text-transparent mb-4">
              ¡Mensaje Enviado con Éxito!
            </h3>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              Hemos recibido tu mensaje y te contactaremos dentro de las próximas <span className="text-primary font-semibold">24 horas</span>.
            </p>
            <motion.button
              onClick={() => setIsSubmitted(false)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-background rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
            >
              Enviar otro mensaje
            </motion.button>
          </div>
          
          {/* Partículas decorativas */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-60"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="relative rounded-3xl bg-gradient-to-br from-gray-800/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl border border-primary/20 p-8 md:p-12 shadow-2xl shadow-black/30 overflow-hidden"
        >
          {/* Efecto de brillo animado */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "linear"
            }}
          />
          
          <div className="relative z-10">
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {inputFields.slice(0, 2).map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="group"
                >
                  <label htmlFor={field.id} className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-primary transition-colors duration-300">
                    {field.label}
                  </label>
                  <div className="relative">
                    <motion.div
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <field.icon className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                    </motion.div>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-gray-500 hover:border-gray-600 backdrop-blur-sm"
                      placeholder={field.placeholder}
                    />
                    {/* Efecto de brillo en focus */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="group"
            >
              <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3 group-focus-within:text-primary transition-colors duration-300">
                Mensaje
              </label>
              <div className="relative">
                <motion.div
                  className="absolute left-4 top-4 z-10"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageSquare className="w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors duration-300" />
                </motion.div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-gray-500 resize-none hover:border-gray-600 backdrop-blur-sm"
                  placeholder="Cuéntanos sobre tu proyecto, ideas, presupuesto y timeline..."
                />
                {/* Efecto de brillo en focus */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={isSubmitting ? {} : { scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative w-full py-4 bg-gradient-to-r from-primary via-emerald-500 to-primary text-background rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-3 text-lg overflow-hidden",
                isSubmitting 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:shadow-primary/40 hover:shadow-xl"
              )}
            >
              {/* Efecto de brillo animado en el botón */}
              {!isSubmitting && (
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
              )}
              
              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Enviando mensaje...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Enviar Mensaje
                  </>
                )}
              </span>
            </motion.button>

            {/* Nota de privacidad */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-center text-gray-400 text-sm flex items-center justify-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-primary" />{' '}
              Tus datos están seguros. No compartimos tu información con terceros.{' '}
              <span className="w-1 h-1 rounded-full bg-primary" />
            </motion.p>
          </form>
          </div>
          
          {/* Partículas decorativas */}
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-primary rounded-full opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-emerald-400 rounded-full opacity-60"></div>
        </motion.div>
      )}

      {/* Información de contacto alternativa */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.7 }}
        className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12"
      >
        {[
          { icon: Mail, title: 'Email', content: 'somos.env@gmail.com', href: 'mailto:somos.env@gmail.com' },
          { icon: MessageSquare, title: 'WhatsApp', content: '+54 343 508-6453', href: 'https://wa.me/3435086453' },
          { icon: User, title: 'Horario', content: 'Lun - Vie: 8:00 - 18:00', href: null }
        ].map((item, index) => {
          const Component = item.href ? motion.a : motion.div;
          return (
            <Component
              key={item.title}
              href={item.href}
              target={item.href?.startsWith('http') ? '_blank' : '_self'}
              rel={item.href?.startsWith('http') ? 'noopener noreferrer' : ''}
              className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 text-center overflow-hidden cursor-pointer"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { type: "tween", duration: 0.15, ease: "easeOut" }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
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
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                </motion.div>
                
                <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Partículas decorativas */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
            </Component>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;