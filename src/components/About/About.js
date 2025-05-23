import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Cpu } from 'lucide-react';
import { skills } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <SectionHeader 
          badge="À Propos"
          title="Passion & Expertise"
          subtitle="Développeur créatif avec une approche moderne du développement web"
        />

        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p>
              Passionné par le développement web depuis plus de 3 ans, je me spécialise dans la création 
              d'applications modernes et performantes. Mon expertise couvre le full-stack development 
              avec un focus particulier sur l'expérience utilisateur.
            </p>
            <p>
              J'aime transformer des idées complexes en solutions simples et élégantes, en utilisant 
              les dernières technologies pour créer des expériences numériques mémorables.
            </p>
            
            <div className="about-highlights">
              <div className="highlight">
                <Code className="highlight-icon" />
                <span>Code Clean & Scalable</span>
              </div>
              <div className="highlight">
                <Palette className="highlight-icon" />
                <span>Design Moderne</span>
              </div>
              <div className="highlight">
                <Cpu className="highlight-icon" />
                <span>Performance Optimisée</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="skills-grid"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="skill-header">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 