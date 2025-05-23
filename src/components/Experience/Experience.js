import React from 'react';
import { experiences } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <SectionHeader 
          badge="Parcours"
          title="Expérience Professionnelle"
        />
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`experience-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="experience-content">
                <div className="experience-header">
                  <h3 className="experience-title">{exp.title}</h3>
                  <h4 className="experience-company">{exp.company}</h4>
                  <span className="experience-period">{exp.period}</span>
                </div>
                
                <p className="experience-description">
                  {exp.description}
                </p>
                
                <div className="experience-technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="experience-marker">
                <div className="marker-dot"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 