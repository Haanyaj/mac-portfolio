import React from 'react';
import { motion } from 'framer-motion';
import './SectionHeader.css';

const SectionHeader = ({ badge, title, subtitle }) => {
  return (
    <motion.div 
      className="section-header"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="section-badge">{badge}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionHeader; 