import React from 'react';
import { motion } from 'framer-motion';
import { Code, Download } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <Code className="logo-icon" />
              <span>DevPortfolio</span>
            </div>
            <p>Développeur Full-Stack passionné par la création d'expériences numériques exceptionnelles.</p>
          </div>
          
          <div className="footer-right">
            <motion.button 
              className="download-cv"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Télécharger CV
            </motion.button>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Alvyn Dev. Tous droits réservés.</p>
          <p>Conçu et développé avec ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 