import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const WorkCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-nav rounded-xl overflow-hidden card-hover"
    >
      <div className="relative overflow-hidden">
        {/* Placeholder for project image */}
        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <div className="text-4xl font-bold text-primary/50">Proyecto {index + 1}</div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/10 flex items-center justify-center"
        >
          <ExternalLink className="w-8 h-8 text-primary" />
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors duration-300">
          {project.name}
        </h3>
        <p className="text-gray-400 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WorkCard;