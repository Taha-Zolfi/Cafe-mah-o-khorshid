import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Phone } from 'lucide-react';
import './Third.css';
import flogo from '../../assets/flogo.webp';

const Third = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.footer
      className="footer"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="footer-container">
        <motion.div className="footer-logo" variants={itemVariants}>
          <motion.img 
            src={flogo} 
            alt="Logo" 
            className="logo" 
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        <motion.div className="footer-address" variants={itemVariants}>
          <p>
            آدرس : بلوار امام رضا ، رو به روی اداره برق ، جنب نانوایی بربری ، پلاک 358
          </p>
        </motion.div>

        <motion.div className="footer-contact" variants={itemVariants}>
  <div className="contact-row">

    <span>mah_khorshid</span>
    <motion.div className="icon-circle" variants={iconVariants}>
      <Instagram size={28} />
    </motion.div>
  </div>
  <div className="contact-row">

    <div className="phone-numbers">
      <span>0910-4587863</span>
      <span>0938-2107469</span>
    </div>
    <motion.div className="icon-circle phone-icon" variants={iconVariants}>
      <Phone size={28} />
    </motion.div>
  </div>
</motion.div>

      </div>
    </motion.footer>
  );
};



export default Third;

