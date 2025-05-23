import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import './Projects.css';

const Projects = ({ activeProject, toggleProject }) => {
  return (
    <section id="projects" className="macos-section">
      <div className="macos-section-header">
        <h2>Projets</h2>
      </div>

      <div className="macos-section-content">
        <SectionHeader 
          badge="Portfolio"
          title="Mes Réalisations"
          subtitle="Découvrez mes projets les plus récents et innovants"
        />

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="macos-card project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.name} />
                <div className="project-overlay">
                  <motion.a 
                    href={project.liveUrl}
                    className="macos-button project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a 
                    href={project.githubUrl}
                    className="macos-button project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </div>
              
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-name">{project.name}</h3>
                  <span className={`project-category ${project.category}`}>
                    {project.category}
                  </span>
                </div>
                
                <p className="project-description">
                  {activeProject === project.id ? project.longDescription : project.description}
                </p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <motion.button
                  className="macos-button project-toggle"
                  onClick={() => toggleProject(project.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeProject === project.id ? 'Voir moins' : 'Voir plus'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 