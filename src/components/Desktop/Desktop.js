import React, { useState } from 'react';
import Dock from '../Dock/Dock';
import Window from '../Window/Window';
import MenuBar from './MenuBar';
import DraggableIcon from './DraggableIcon';
import LoadingTrigger from './LoadingTrigger';
import { personalInfo } from '../../data/portfolio';
import './Desktop.css';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [desktopIcons, setDesktopIcons] = useState(() => {
    // Essayer de charger les positions depuis localStorage
    const savedPositions = localStorage.getItem('desktopIconPositions');
    const defaultIcons = [
      { 
        id: 'about', 
        label: 'À Propos', 
        icon: '👨‍💻',
        useImage: false,
        type: 'about-icon',
        x: 50,
        y: 50,
        delay: '0.1s'
      },
      { 
        id: 'projects', 
        label: 'Projets', 
        icon: '💼',
        useImage: false,
        type: 'projects-icon',
        x: 50,
        y: 150,
        delay: '0.2s'
      },
      { 
        id: 'experience', 
        label: 'Expérience', 
        icon: '🏢',
        useImage: false,
        type: 'experience-icon',
        x: 50,
        y: 250,
        delay: '0.3s'
      },
      { 
        id: 'contact', 
        label: 'Contact', 
        src: '/icons/mail.svg',
        useImage: true,
        type: 'contact-icon',
        x: 50,
        y: 450,
        delay: '0.5s'
      },
      { 
        id: 'cv', 
        label: 'CV.pdf', 
        icon: '📄',
        useImage: false,
        type: 'document-icon',
        x: 150,
        y: 50,
        delay: '0.6s'
      },
      { 
        id: 'finder', 
        label: 'Finder', 
        src: '/icons/finder.svg',
        useImage: true,
        type: 'finder-icon',
        x: 150,
        y: 150,
        delay: '0.7s'
      },
      { 
        id: 'safari', 
        label: 'Safari', 
        src: '/icons/safari.svg',
        useImage: true,
        type: 'safari-icon',
        x: 150,
        y: 250,
        delay: '0.8s'
      },
      
     
    ];

    if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions);
        return defaultIcons.map(icon => {
          const savedIcon = positions.find(p => p.id === icon.id);
          return savedIcon ? { ...icon, x: savedIcon.x, y: savedIcon.y } : icon;
        });
      } catch (e) {
        console.warn('Erreur lors du chargement des positions des icônes:', e);
        return defaultIcons;
      }
    }
    
    return defaultIcons;
  });

  // Sauvegarder les positions des icônes
  React.useEffect(() => {
    const positions = desktopIcons.map(icon => ({
      id: icon.id,
      x: icon.x,
      y: icon.y
    }));
    localStorage.setItem('desktopIconPositions', JSON.stringify(positions));
  }, [desktopIcons]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (appId) => {
    if (!openWindows.find(window => window.id === appId)) {
      const newWindow = {
        id: appId,
        isMinimized: false,
        zIndex: Date.now()
      };
      setOpenWindows([...openWindows, newWindow]);
    } else {
      // Bring to front if already open
      setOpenWindows(windows => 
        windows.map(window => 
          window.id === appId 
            ? { ...window, isMinimized: false, zIndex: Date.now() }
            : window
        )
      );
    }
  };

  const closeApp = (appId) => {
    setOpenWindows(windows => windows.filter(window => window.id !== appId));
  };

  const minimizeApp = (appId) => {
    setOpenWindows(windows => 
      windows.map(window => 
        window.id === appId 
          ? { ...window, isMinimized: true }
          : window
      )
    );
  };

  const handleDesktopClick = (e) => {
    if (e.target.className === 'desktop' || e.target.className === 'wallpaper') {
      setSelectedIcon(null);
      setContextMenu(null);
    }
  };

  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleIconMove = (iconId, x, y) => {
    setDesktopIcons(icons => 
      icons.map(icon => 
        icon.id === iconId 
          ? { ...icon, x, y }
          : icon
      )
    );
  };

  const handleIconSelect = (iconId) => {
    setSelectedIcon(iconId);
    setContextMenu(null);
  };

  const handleIconClick = (iconId) => {
    openApp(iconId);
    setSelectedIcon(null);
  };

  const handleIconDoubleClick = (iconId) => {
    openApp(iconId);
    setSelectedIcon(null);
  };

  const arrangeIcons = () => {
    const gridSize = 100;
    const startX = 50;
    const startY = 50;
    
    setDesktopIcons(icons => 
      icons.map((icon, index) => ({
        ...icon,
        x: startX + (Math.floor(index / 6) * gridSize),
        y: startY + ((index % 6) * gridSize)
      }))
    );
    setContextMenu(null);
  };

  const resetIconPositions = () => {
    localStorage.removeItem('desktopIconPositions');
    setDesktopIcons(icons => [
      { ...icons.find(i => i.id === 'about'), x: 50, y: 50 },
      { ...icons.find(i => i.id === 'projects'), x: 50, y: 150 },
      { ...icons.find(i => i.id === 'experience'), x: 50, y: 250 },
      { ...icons.find(i => i.id === 'skills'), x: 50, y: 350 },
      { ...icons.find(i => i.id === 'contact'), x: 50, y: 450 },
      { ...icons.find(i => i.id === 'cv'), x: 150, y: 50 },
      { ...icons.find(i => i.id === 'finder'), x: 150, y: 150 },
      { ...icons.find(i => i.id === 'safari'), x: 150, y: 250 },
    ]);
    setContextMenu(null);
  };

  return (
    <div 
      className="desktop" 
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
    >
      {/* Wallpaper */}
      <div className="wallpaper"></div>
      
      {/* Menu Bar */}
      <MenuBar currentTime={currentTime} />
      
      {/* Loading Trigger Button */}
      <LoadingTrigger />
      
      {/* Desktop Icons */}
      <div className="desktop-icons-container">
        {desktopIcons.map((icon) => (
          <DraggableIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIcon === icon.id}
            onMove={handleIconMove}
            onSelect={handleIconSelect}
            onDoubleClick={handleIconClick}
          />
        ))}
      </div>
      
      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <div className="context-item" onClick={() => setContextMenu(null)}>
            <span className="context-icon">🔄</span>
            Actualiser le bureau
          </div>
          <div className="context-item" onClick={arrangeIcons}>
            <span className="context-icon">📐</span>
            Organiser les icônes
          </div>
          <div className="context-item" onClick={resetIconPositions}>
            <span className="context-icon">🔙</span>
            Réinitialiser positions
          </div>
          <div className="context-item" onClick={() => setContextMenu(null)}>
            <span className="context-icon">📋</span>
            Coller
          </div>
          <div className="context-separator"></div>
          <div className="context-item" onClick={() => setContextMenu(null)}>
            <span className="context-icon">⚙️</span>
            Préférences du bureau
          </div>
        </div>
      )}
      
      {/* Open Windows */}
      {openWindows.map(window => (
        !window.isMinimized && (
          <Window
            key={window.id}
            appId={window.id}
            zIndex={window.zIndex}
            onClose={() => closeApp(window.id)}
            onMinimize={() => minimizeApp(window.id)}
            onFocus={(appId) => {
              setOpenWindows(windows => 
                windows.map(window => 
                  window.id === appId 
                    ? { ...window, zIndex: Date.now() }
                    : window
                )
              );
            }}
            openApp={openApp}
          />
        )
      ))}
      
      {/* Dock */}
      <Dock 
        openWindows={openWindows}
        onAppClick={openApp}
        onAppRestore={(appId) => {
          setOpenWindows(windows => 
            windows.map(window => 
              window.id === appId 
                ? { ...window, isMinimized: false, zIndex: Date.now() }
                : window
            )
          );
        }}
      />
    </div>
  );
};

export default Desktop; 