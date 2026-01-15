import { motion } from 'framer-motion';

const logos = [
  { name: 'Company 1', placeholder: 'LOGO' },
  { name: 'Company 2', placeholder: 'LOGO' },
  { name: 'Company 3', placeholder: 'LOGO' },
  { name: 'Company 4', placeholder: 'LOGO' },
  { name: 'Company 5', placeholder: 'LOGO' },
  { name: 'Company 6', placeholder: 'LOGO' },
];

const ClientLogos = () => {
  return (
    <section className="py-16 lg:py-20 border-b border-border">
      <div className="container mx-auto px-6">
        <motion.p
          className="text-center text-sm text-muted-foreground mb-10 uppercase tracking-wider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by industry leaders
        </motion.p>
        
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              className="w-28 h-12 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              whileHover={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="text-lg font-medium text-muted-foreground">{logo.placeholder}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
