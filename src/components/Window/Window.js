import React, { useState, useEffect, useCallback, useRef } from 'react';
import { personalInfo, projects, experiences, skills, services } from '../../data/portfolio';
import './Window.css';

const Window = ({ appId, zIndex, onClose, onMinimize, onFocus }) => {
  const [position, setPosition] = useState({ 
    x: Math.random() * 200 + 50, 
    y: Math.random() * 100 + 50 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [windowState, setWindowState] = useState('entering'); // 'entering', 'ready'
  const [hasAnimated, setHasAnimated] = useState(false);
  const windowRef = useRef(null);

  // Gérer l'animation d'entrée - une seule fois
  useEffect(() => {
    if (!hasAnimated) {
      // Démarrer avec la classe d'animation
      const timer1 = setTimeout(() => {
        setWindowState('ready');
        setHasAnimated(true);
      }, 250); // Durée de l'animation

      return () => {
        clearTimeout(timer1);
      };
    } else {
      // Si déjà animé, passer directement à l'état ready
      setWindowState('ready');
    }
  }, [hasAnimated]);

  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.window-controls')) return;
    
    // Gérer le focus de la fenêtre
    if (onFocus) {
      onFocus(appId);
    }
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position, onFocus, appId]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 750)),
        y: Math.max(24, Math.min(e.clientY - dragOffset.y, window.innerHeight - 550))
      });
    }
  }, [isDragging, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWindowClick = useCallback((e) => {
    if (onFocus && !isDragging && windowState === 'ready') {
      onFocus(appId);
    }
  }, [onFocus, appId, isDragging, windowState]);

  const handleDoubleClick = useCallback((e) => {
    // Empêcher la propagation du double-clic qui pourrait causer des re-renders
    e.preventDefault();
    e.stopPropagation();
    
    // Gérer le focus si nécessaire
    if (onFocus && windowState === 'ready') {
      onFocus(appId);
    }
  }, [onFocus, appId, windowState]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getWindowContent = () => {
    switch (appId) {
      case 'about':
        return (
          <div className="window-content about-content">
            <div className="profile-header">
              <div className="profile-avatar">
                <span className="avatar-emoji">👨‍💻</span>
              </div>
              <div className="profile-info">
                <h1>{personalInfo.name}</h1>
                <h2>{personalInfo.title}</h2>
                <p>{personalInfo.description}</p>
              </div>
            </div>
            
            <div className="contact-info">
              <div className="contact-item">
                <span className="icon">📧</span>
                <span>{personalInfo.email}</span>
              </div>
              <div className="contact-item">
                <span className="icon">📍</span>
                <span>{personalInfo.location}</span>
              </div>
              <div className="contact-item">
                <span className="icon">📱</span>
                <span>{personalInfo.phone}</span>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{personalInfo.stats.projectsCompleted}</span>
                <span className="stat-label">Projets Complétés</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{personalInfo.stats.yearsExperience}</span>
                <span className="stat-label">Années d'Expérience</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{personalInfo.stats.happyClients}</span>
                <span className="stat-label">Clients Satisfaits</span>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="window-content projects-content">
            <div className="projects-header">
              <h2>Mes Projets</h2>
              <div className="projects-tabs">
                {['Tous', 'Web', 'Mobile', 'Data', 'Blockchain'].map((tab, index) => (
                  <button 
                    key={tab}
                    className={`tab-button ${activeTab === index ? 'active' : ''}`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="projects-grid">
              {projects
                .filter(project => activeTab === 0 || project.category === ['web', 'mobile', 'data', 'blockchain'][activeTab - 1])
                .map(project => (
                  <div 
                    key={project.id} 
                    className="project-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="project-image">
                      <div className="project-placeholder" style={{ background: project.color }}>
                        {project.category === 'web' && '🌐'}
                        {project.category === 'mobile' && '📱'}
                        {project.category === 'data' && '📊'}
                        {project.category === 'blockchain' && '⛓️'}
                      </div>
                    </div>
                    <div className="project-info">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <div className="project-tech">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {selectedProject && (
              <div className="project-modal" onClick={() => setSelectedProject(null)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <h3>{selectedProject.name}</h3>
                  <p>{selectedProject.longDescription}</p>
                  <div className="project-links">
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      Voir le projet
                    </a>
                  </div>
                  <button onClick={() => setSelectedProject(null)}>Fermer</button>
                </div>
              </div>
            )}
          </div>
        );

      case 'experience':
        return (
          <div className="window-content experience-content">
            <h2>Mon Parcours Professionnel</h2>
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{exp.title}</h3>
                      <h4>{exp.company}</h4>
                      <span className="timeline-period">{exp.period}</span>
                    </div>
                    <p>{exp.description}</p>
                    <div className="timeline-tech">
                      {exp.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="window-content skills-content">
            <h2>Mes Compétences</h2>
            <div className="skills-grid">
              {skills.map(skill => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="window-content contact-content">
            <h2>Contactez-moi</h2>
            <div className="contact-form">
              <div className="form-group">
                <label>Nom</label>
                <input type="text" placeholder="Votre nom" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="votre@email.com" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Votre message..." rows="5"></textarea>
              </div>
              <button className="send-button">Envoyer le message</button>
            </div>
            
            <div className="contact-links">
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <span className="icon">📱</span> GitHub
              </a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="icon">💼</span> LinkedIn
              </a>
            </div>
          </div>
        );

      case 'finder':
        return (
          <div className="window-content finder-content">
            <h2>Portfolio - Finder</h2>
            <div className="finder-sidebar">
              <div className="sidebar-section">
                <h3>Favoris</h3>
                <ul>
                  <li>📁 Bureau</li>
                  <li>📁 Documents</li>
                  <li>💼 Projets</li>
                  <li>🏢 Expérience</li>
                </ul>
              </div>
            </div>
            <div className="finder-main">
              <div className="folder" onClick={() => window.open('#about')}>
                <span className="folder-icon">👨‍💻</span>
                <span>À Propos</span>
              </div>
              <div className="folder">
                <span className="folder-icon">💼</span>
                <span>Projets</span>
              </div>
              <div className="folder">
                <span className="folder-icon">🏢</span>
                <span>Expérience</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="window-content">
            <h2>Application {appId}</h2>
            <p>Cette application est en cours de développement...</p>
          </div>
        );
    }
  };

  const getWindowTitle = () => {
    switch (appId) {
      case 'about': return 'À Propos de moi';
      case 'projects': return 'Mes Projets';
      case 'experience': return 'Mon Expérience';
      case 'skills': return 'Mes Compétences';
      case 'contact': return 'Contact';
      case 'finder': return 'Finder';
      default: return appId;
    }
  };

  return (
    <div 
      className={`window ${appId}-window ${hasAnimated ? 'window-ready' : `window-${windowState}`}`}
      style={{ 
        left: position.x, 
        top: position.y,
        zIndex: zIndex 
      }}
      ref={windowRef}
      onClick={handleWindowClick}
      onDoubleClick={handleDoubleClick}
    >
      <div 
        className="window-header"
        onMouseDown={handleMouseDown}
      >
        <div className="window-controls">
          <button className="control-button close" onClick={onClose}>
            <span>×</span>
          </button>
          <button className="control-button minimize" onClick={onMinimize}>
            <span>−</span>
          </button>
          <button className="control-button maximize">
            <span>□</span>
          </button>
        </div>
        <div className="window-title">
          {getWindowTitle()}
        </div>
      </div>
      
      {getWindowContent()}
    </div>
  );
};

export default Window;