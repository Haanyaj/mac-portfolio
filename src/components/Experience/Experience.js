import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experiences } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import './Experience.css';

const Experience = () => {
  return (
    <section id="experience" className="macos-section">
      <div className="macos-section-header">
        <h2>Expérience</h2>
      </div>

      <div className="macos-section-content">
        <SectionHeader 
          badge="Parcours"
          title="Mon Expérience Professionnelle"
          subtitle="Découvrez mon parcours et mes réalisations"
        />

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="macos-card experience-content">
                <div className="experience-header">
                  <div className="experience-title">
                    <h3>{exp.title}</h3>
                    <span className="experience-company">{exp.company}</span>
                  </div>
                  <div className="experience-period">
                    <Calendar size={16} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="experience-location">
                  <MapPin size={16} />
                  <span>{exp.location}</span>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-technologies">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="experience-marker">
                  <Briefcase size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 