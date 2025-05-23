import React, { useState, useEffect, useCallback, useRef } from 'react';
import { personalInfo, projects, experiences, skills, services } from '../../data/portfolio';
import './Window.css';
import About from '../About/About';
import Projects from '../Projects/Projects';
import Experience from '../Experience/Experience';
// import Skills from '../Skills/Skills';
import Contact from '../Contact/Contact';

const Window = ({ appId, zIndex, onClose, onMinimize, onFocus, openApp }) => {
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
  const [currentPath, setCurrentPath] = useState(['Portfolio']);
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleFinderItemClick = (item) => {
    switch(item) {
      case 'about':
      case 'projects':
      case 'experience':
      case 'skills':
      case 'contact':
        // Fermer la fenêtre finder actuelle
        onClose();
        // Ouvrir la nouvelle fenêtre
        openApp(item);
        break;
      default:
        if (item.endsWith('.pdf')) {
          window.open(personalInfo.cvUrl, '_blank');
        }
    }
  };

  const handleSidebarItemClick = (item) => {
    setCurrentPath(['Portfolio', item]);
  };

  const getWindowContent = () => {
    switch (appId) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'experience':
        return <Experience />;
      // case 'skills':
      //   return <Skills />;
      case 'contact':
        return <Contact />;
      case 'finder':
        return (
          <div className="window-content finder-content">
            <div className="finder-toolbar">
              <div className="finder-view-options">
                <button 
                  className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <span className="view-icon">📋</span>
                  <span>Liste</span>
                </button>
                <button 
                  className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <span className="view-icon">📁</span>
                  <span>Grille</span>
                </button>
              </div>
            </div>
            
            <div className="finder-container">
              <div className={`finder-items ${viewMode}`}>
                <div className="finder-item" onClick={() => handleFinderItemClick('about')}>
                  <span className="item-icon">👨‍💻</span>
                  <span className="item-name">À Propos</span>
                  <span className="item-info">Informations personnelles</span>
                </div>
                
                <div className="finder-item" onClick={() => handleFinderItemClick('projects')}>
                  <span className="item-icon">💼</span>
                  <span className="item-name">Projets</span>
                  <span className="item-info">{projects.length} projets</span>
                </div>
                
                <div className="finder-item" onClick={() => handleFinderItemClick('experience')}>
                  <span className="item-icon">🏢</span>
                  <span className="item-name">Expérience</span>
                  <span className="item-info">{experiences.length} expériences</span>
                </div>
                
                <div className="finder-item" onClick={() => handleFinderItemClick('skills')}>
                  <span className="item-icon">🔧</span>
                  <span className="item-name">Compétences</span>
                  <span className="item-info">{skills.length} compétences</span>
                </div>
                
                <div className="finder-item" onClick={() => handleFinderItemClick('contact')}>
                  <span className="item-icon">📧</span>
                  <span className="item-name">Contact</span>
                  <span className="item-info">Me contacter</span>
                </div>
                
                <div className="finder-item" onClick={() => window.open(personalInfo.cvUrl, '_blank')}>
                  <span className="item-icon">📄</span>
                  <span className="item-name">CV.pdf</span>
                  <span className="item-info">Curriculum Vitae</span>
                </div>
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