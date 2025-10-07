import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, User, Mail, MessageSquare, Sparkles } from 'lucide-react';
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset form after success
    setTimeout(() => setIsSubmitted(false), 5000);
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
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header del Formulario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-medium">Contacto Rápido</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Hablemos de tu <span className="text-primary">proyecto</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          ¿Tienes una idea innovadora? Completa el formulario y te contactaremos en menos de 24 horas.
        </p>
      </motion.div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 0.5 }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            ¡Mensaje Enviado con Éxito!
          </h3>
          <p className="text-gray-300 text-lg mb-6">
            Hemos recibido tu mensaje y te contactaremos dentro de las próximas 24 horas.
          </p>
          <motion.button
            onClick={() => setIsSubmitted(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-background rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Enviar otro mensaje
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-nav/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 md:p-12 shadow-2xl shadow-black/20"
        >
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="contact" />
            
            <div className="grid md:grid-cols-2 gap-8">
              {inputFields.slice(0, 2).map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-semibold text-gray-300 mb-3">
                    {field.label}
                  </label>
                  <div className="relative">
                    <field.icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="w-full pl-12 pr-4 py-4 bg-background border border-gray-600 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-white placeholder-gray-500"
                      placeholder={field.placeholder}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">
                Mensaje
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-background border border-gray-600 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-white placeholder-gray-500 resize-none"
                  placeholder="Cuéntanos sobre tu proyecto..."
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full py-4 bg-gradient-to-r from-primary to-primary/80 text-background rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg",
                isSubmitting 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:shadow-primary/30 hover:scale-105"
              )}
            >
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
            </motion.button>

            {/* Nota de privacidad */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center text-gray-400 text-sm"
            >
              Tus datos están seguros. No compartimos tu información con terceros.
            </motion.p>
          </form>
        </motion.div>
      )}

      {/* Información de contacto alternativa */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid md:grid-cols-3 gap-6 mt-12"
      >
        {[
          { icon: Mail, title: 'Email', content: 'hola@somos.com', href: 'mailto:hola@somos.com' },
          { icon: MessageSquare, title: 'WhatsApp', content: '+54 11 1234-5678', href: 'https://wa.me/541112345678' },
          { icon: User, title: 'Horario', content: 'Lun - Vie: 9:00 - 18:00', href: null }
        ].map((item, index) => (
          <motion.a
            key={item.title}
            href={item.href}
            target={item.href?.startsWith('http') ? '_blank' : '_self'}
            rel={item.href?.startsWith('http') ? 'noopener noreferrer' : ''}
            className="p-6 bg-nav/30 rounded-xl border border-gray-700/50 hover:border-primary/30 transition-all duration-300 group text-center"
            whileHover={{ y: -5, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-white font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.content}</p>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;