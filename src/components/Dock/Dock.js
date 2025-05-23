import React, { useState, useRef, useEffect } from 'react';
import './Dock.css';

const Dock = ({ openWindows, onAppClick, onAppRestore }) => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const [dockVisible, setDockVisible] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dockRef = useRef(null);

  const apps = [
    { 
      id: 'finder', 
      name: 'Finder', 
      icon: '/icons/Finder.png', 
      color: '#007AFF',
      action: 'app',
      useImage: true
    },
    { 
      id: 'safari', 
      name: 'Safari', 
      icon: '/icons/safari.svg', 
      color: '#E17055',
      action: 'url',
      url: 'https://google.com',
      useImage: true
    },
    { 
      id: 'messages', 
      name: 'Messages', 
      icon: '/icons/ios-message.svg', 
      color: '#67E467',
      action: 'app',
      useImage: true
    },
    { 
      id: 'contact', 
      name: 'Mail', 
      icon: '/icons/mail.svg', 
      color: '#74B9FF',
      action: 'app',
      useImage: true
    },
    { 
      id: 'maps', 
      name: 'Plans', 
      icon: '/icons/plans.svg', 
      color: '#8CC152',
      action: 'special',
      useImage: true
    },
    { 
      id: 'photos', 
      name: 'Photos', 
      icon: '/icons/photos.svg', 
      color: '#FFFFFF',
      action: 'special',
      useImage: true
    },
    { 
      id: 'facetime', 
      name: 'FaceTime', 
      icon: '/icons/facetime.svg', 
      color: '#67E467',
      action: 'special',
      useImage: true
    },
    { 
      id: 'calculator', 
      name: 'calculator', 
      icon: '/icons/calculator.svg', 
      color: '#FFFFFF',
      action: 'special',
      useImage: true
    },
    { 
      id: 'contacts', 
      name: 'Contacts', 
      icon: '/icons/contacts.svg', 
      color: '#FF9500',
      action: 'special',
      useImage: true
    },
    { 
      id: 'reminders', 
      name: 'reminders', 
      icon: '/icons/reminders.svg', 
      color: '#FFE135',
      action: 'special',
      useImage: true
    },
    { 
      id: 'music', 
      name: 'Musique', 
      icon: '/icons/musique.png', 
      color: '#FA2D48',
      action: 'url',
      url: 'https://music.apple.com',
      useImage: true
    },
    { 
      id: 'appletv', 
      name: 'Apple TV', 
      icon: '/icons/apple-tv.svg', 
      color: '#1C1C1E',
      action: 'url',
      url: 'https://tv.apple.com',
      useImage: true
    },
    { 
      id: 'appstore', 
      name: 'App Store', 
      icon: '/icons/app-store.svg', 
      color: '#4F9BFF',
      action: 'special',
      useImage: true
    },
  
    { 
      id: 'trash', 
      name: 'Corbeille', 
      icon: '/icons/trash.png', 
      color: '#8E8E93',
      action: 'special',
      useImage: true
    }
  ];

  const handleAppClick = (app) => {
    // Add launch animation
    const appElement = document.querySelector(`[data-app-id="${app.id}"]`);
    if (appElement) {
      appElement.classList.add('launching');
      setTimeout(() => {
        appElement.classList.remove('launching');
      }, 600);
    }

    switch (app.action) {
      case 'app':
        const openWindow = openWindows.find(window => window.id === app.id);
        if (openWindow && openWindow.isMinimized) {
          onAppRestore(app.id);
        } else {
          onAppClick(app.id);
        }
        break;
      case 'url':
        window.open(app.url, '_blank');
        break;
      case 'special':
        if (app.id === 'trash') {
          // Animation for trash
          if (appElement) {
            appElement.style.animation = 'trashShake 0.5s ease-in-out';
            setTimeout(() => {
              appElement.style.animation = '';
            }, 500);
          }
        }
        break;
      default:
        break;
    }
  };

  const isAppOpen = (appId) => {
    return openWindows.some(window => window.id === appId && !window.isMinimized);
  };

  const isAppMinimized = (appId) => {
    return openWindows.some(window => window.id === appId && window.isMinimized);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const calculateScale = (index, mouseX) => {
    if (!dockRef.current) return 1;
    
    const dockRect = dockRef.current.getBoundingClientRect();
    const itemWidth = 60; // Approximative width of each dock item
    const itemCenterX = dockRect.left + (index * itemWidth) + (itemWidth / 2);
    const distance = Math.abs(mouseX - itemCenterX);
    const maxDistance = 120;
    
    if (distance > maxDistance) return 1;
    
    const scale = 1 + (0.8 * (1 - distance / maxDistance));
    return Math.min(scale, 1.8);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleMouseMove(e);
      
      // Auto-hide dock logic
      const screenHeight = window.innerHeight;
      const mouseY = e.clientY;
      
      if (mouseY > screenHeight - 100) {
        setDockVisible(true);
      } else if (mouseY < screenHeight - 200) {
        setDockVisible(true); // Keep visible for demo
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <div className={`dock-container ${dockVisible ? 'visible' : 'hidden'}`}>
      <div className="dock" ref={dockRef}>
        {apps.map((app, index) => {
          const scale = calculateScale(index, mousePosition.x);
          
          return (
            <div
              key={app.id}
              data-app-id={app.id}
              className={`dock-item ${isAppOpen(app.id) ? 'active' : ''} ${isAppMinimized(app.id) ? 'minimized' : ''}`}
              onClick={() => handleAppClick(app)}
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
              style={{
                '--app-color': app.color,
                '--index': index,
                '--scale': scale,
              }}
            >
              <div className="dock-icon">
                {app.useImage ? (
                  <img src={app.icon} alt={app.name} className="icon-image" />
                ) : (
                  <span className="icon-emoji">{app.icon}</span>
                )}
                {isAppOpen(app.id) && <div className="active-indicator"></div>}
                {isAppMinimized(app.id) && <div className="minimized-indicator"></div>}
                
                {/* Special effects for certain apps */}
                {app.id === 'github' && <div className="github-glow"></div>}
                {app.id === 'linkedin' && <div className="linkedin-glow"></div>}
              </div>
              
              {hoveredApp === app.id && (
                <div className="dock-tooltip">
                  {app.name}
                  {app.action === 'url' && <div className="tooltip-subtitle">Ouvrir dans le navigateur</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Dock background blur effect */}
      <div className="dock-background"></div>
    </div>
  );
};

export default Dock; 