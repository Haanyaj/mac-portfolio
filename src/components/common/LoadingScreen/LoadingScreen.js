import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <motion.div 
        className="loading-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="loading-logo"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Code size={60} />
        </motion.div>
        <motion.h2 
          className="loading-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Chargement du portfolio...
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 