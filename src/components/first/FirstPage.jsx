import React from 'react';
import { motion } from 'framer-motion';
import './First.css';
import logo from '../../assets/logo.webp';

const First = () => {
  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const circleVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 10 } }
  };

  return (
    <div className='First'> 
      <div className="nav">
        <a href="#about">درباره ما</a>
        <a>|</a>
        <a href="#footer">ارتباط با ما</a>
        <a>|</a>
        <a href="#footer">آدرس</a>
      </div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        کافه فست فود
      </motion.h1>
      <motion.div 
        className="content"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="ct1" variants={circleVariants} />
        <motion.div className="ct2" variants={circleVariants} />
        <motion.div className="ct3" variants={circleVariants} />
        <motion.div className="ct4" variants={circleVariants} />
        <motion.img 
          src={logo} 
          alt="ماه و خورشید"
          variants={itemVariants}
        />
      </motion.div>
      <motion.a 
        href="/menu"
        variants={itemVariants}
      >
<motion.button
  className="btn"
  initial={{ opacity: 0, y: 50 }} // Start hidden and below
  animate={{ opacity: 1, y: 0 }} // Animate to visible and in place
  transition={{ duration: 0.2, ease: "easeOut" }} // Smooth animation
  whileHover={{
    scale: 1.1,
    backgroundColor: "#FF6347",
    color: "#fcf7e3",
    boxShadow: "0px 5px 15px rgba(255, 99, 71, 0.4)",
    transition: { duration: 0.1 },
  }}
  whileTap={{
    scale: 0.9,
    transition: { duration: 0.1 },
  }}
>
  مشاهده منو
</motion.button>

      </motion.a>
    </div> 
  );
}

export default First;

