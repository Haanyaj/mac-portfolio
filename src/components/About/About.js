import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Cpu } from 'lucide-react';
import { skills, personalInfo } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import './About.css';

const About = () => {
  return (
    <section id="about" className="macos-section">
      <div className="macos-section-header">
        <h2>À Propos</h2>
      </div>
      
      <div className="macos-section-content">
        <motion.div 
          className="about-macos-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="about-avatar-shadow">
            <div className="about-avatar">
              <span className="avatar-emoji">👨‍💻</span>
            </div>
          </div>
          <div className="about-macos-info">
            <h1 className="about-macos-name gradient-text">{personalInfo.name}</h1>
            <h2 className="about-macos-title">{personalInfo.title}</h2>
            <p className="about-macos-desc">{personalInfo.description}</p>
          </div>
        </motion.div>

        <motion.div 
          className="about-macos-highlights"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="macos-card">
            <Code className="highlight-icon" />
            <span>Code Clean & Scalable</span>
          </div>
          <div className="macos-card">
            <Palette className="highlight-icon" />
            <span>Design Moderne</span>
          </div>
          <div className="macos-card">
            <Cpu className="highlight-icon" />
            <span>Performance Optimisée</span>
          </div>
        </motion.div>

        <motion.div 
          className="about-macos-skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3>Compétences Techniques</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                className="macos-card skill-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
                <div className="skill-level">
                  <div 
                    className="skill-progress" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 