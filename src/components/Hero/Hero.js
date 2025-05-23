import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ArrowRight, ChevronDown } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import FloatingShapes from './FloatingShapes';
import './Hero.css';

const Hero = ({ scrollToSection }) => {
  return (
    <section id="home" className="hero-section">
      <FloatingShapes />

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Star className="badge-icon" />
          {personalInfo.title}
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Salut, je suis <span className="text-gradient">{personalInfo.name}</span>
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {personalInfo.description}
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button 
            className="cta-primary"
            onClick={() => scrollToSection('projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={20} />
            Voir mes projets
          </motion.button>
          
          <motion.button 
            className="cta-secondary"
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Me contacter
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>

        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="stat">
            <span className="stat-number">{personalInfo.stats.projectsCompleted}</span>
            <span className="stat-label">Projets réalisés</span>
          </div>
          <div className="stat">
            <span className="stat-number">{personalInfo.stats.yearsExperience}</span>
            <span className="stat-label">Années d'expérience</span>
          </div>
          <div className="stat">
            <span className="stat-number">{personalInfo.stats.happyClients}</span>
            <span className="stat-label">Clients satisfaits</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero; 