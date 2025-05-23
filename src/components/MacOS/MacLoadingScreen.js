import React, { useState, useEffect } from 'react';
import './MacLoadingScreen.css';

const MacLoadingScreen = ({ onLoadingComplete }) => {
  const [loadingPhase, setLoadingPhase] = useState('startup'); // startup, boot, macos, apps
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showElements, setShowElements] = useState(false);
  const [bootText, setBootText] = useState('');

  const appIcons = [
    { name: 'Apple TV', src: '/icons/apple-tv.svg', delay: 0.05 },
    { name: 'Rappels', src: '/icons/reminders.svg', delay: 0.1 },
    { name: 'Mail', src: '/icons/mail.svg', delay: 0.15 },
    { name: 'Réglages', src: '/icons/settings.svg', delay: 0.2 },
    { name: 'Safari', src: '/icons/safari.svg', delay: 0.25 },
    { name: 'Calculatrice', src: '/icons/calculator.svg', delay: 0.3 },
    { name: 'App Store', src: '/icons/app-store.svg', delay: 0.35 },
    { name: 'FaceTime', src: '/icons/facetime.svg', delay: 0.4 },
    { name: 'Photos', src: '/icons/photos.svg', delay: 0.45 },
    { name: 'Messages', src: '/icons/ios-message.svg', delay: 0.5 },
    { name: 'Contacts', src: '/icons/contacts.svg', delay: 0.55 }
  ];

  const bootMessages = [
    'Initialisation...',
    'Chargement macOS...',
    'Préparation du bureau...'
  ];

  useEffect(() => {
    const bootSequence = async () => {
      // Phase 1: Démarrage rapide
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Phase 2: Logo Apple et barre de progression (plus rapide)
      setLoadingPhase('boot');
      
      // Messages de démarrage accélérés
      for (let i = 0; i < bootMessages.length; i++) {
        setBootText(bootMessages[i]);
        await new Promise(resolve => {
          const progressInterval = setInterval(() => {
            setLoadingProgress(prev => {
              const newProgress = prev + (100 / bootMessages.length / 10);
              if (newProgress >= (i + 1) * (100 / bootMessages.length)) {
                clearInterval(progressInterval);
                resolve();
                return (i + 1) * (100 / bootMessages.length);
              }
              return newProgress;
            });
          }, 30);
        });
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Phase 3: Transition vers macOS (plus rapide)
      setLoadingPhase('macos');
      setShowElements(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Phase 4: Affichage des applications (plus rapide)
      setLoadingPhase('apps');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Directement au bureau
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    };

    bootSequence();
  }, [onLoadingComplete]);

  return (
    <div className="mac-loading-screen">
      <div className="macbook-screen">
        {/* Phase de démarrage */}
        {loadingPhase === 'startup' && (
          <div className="startup-phase">
            <div className="startup-black"></div>
          </div>
        )}

        {/* Phase de boot avec Apple logo */}
        {loadingPhase === 'boot' && (
          <div className="boot-phase">
            <div className="apple-logo-container">
              <img src="/icons/Apple_logo_black.svg" alt="Apple" className="apple-logo-boot" />
            </div>
            <div className="boot-progress-container">
              <div className="boot-progress-bar">
                <div 
                  className="boot-progress-fill" 
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div className="boot-text">{bootText}</div>
            </div>
          </div>
        )}

        {/* Phase macOS principale */}
        {loadingPhase === 'macos' && (
          <div className="macos-phase">
            <div className="macos-logo-main">
              <img src="/icons/mac-os.png" alt="macOS" className="macos-main-image" />
              <div className="macos-title">macOS</div>
            </div>
            <div className="macos-loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
        )}

        {/* Phase des applications */}
        {loadingPhase === 'apps' && (
          <div className="apps-phase">
            <div className="macos-header">
              <img src="/icons/mac-os.png" alt="macOS" className="macos-header-icon" />
              <span>Finalisation...</span>
            </div>
            
            <div className="apps-loading-grid">
              {appIcons.map((app, index) => (
                <div 
                  key={app.name}
                  className="app-loading-item"
                  style={{ 
                    animationDelay: `${app.delay}s`,
                    opacity: showElements ? 1 : 0
                  }}
                >
                  <div className="app-loading-icon">
                    <img src={app.src} alt={app.name} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="loading-status">
              <div className="status-text">Chargement terminé</div>
              <div className="status-progress">
                <div className="status-bar"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MacLoadingScreen; 