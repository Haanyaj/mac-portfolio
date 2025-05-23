import React, { useState, useRef } from 'react';
import './DraggableIcon.css';

const DraggableIcon = ({ icon, onMove, onSelect, onDoubleClick, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [launching, setLaunching] = useState(false);
  const iconRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    onSelect(icon.id);
    
    const rect = iconRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const desktopRect = iconRef.current.parentElement.getBoundingClientRect();
    const iconWidth = iconRef.current.offsetWidth;
    const iconHeight = iconRef.current.offsetHeight;
    
    const newX = Math.max(0, Math.min(
      e.clientX - desktopRect.left - dragOffset.x,
      desktopRect.width - iconWidth
    ));
    
    const newY = Math.max(24, Math.min( // 24px pour la barre de menu
      e.clientY - desktopRect.top - dragOffset.y,
      desktopRect.height - iconHeight - 100 // 100px pour le dock
    ));
    
    onMove(icon.id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    // Animation de lancement
    setLaunching(true);
    setTimeout(() => setLaunching(false), 600);
    
    onDoubleClick(icon.id);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // Fonction pour rendre l'icône selon son type
  const renderIcon = () => {
    // Si c'est une image classique
    if (icon.useImage && icon.src) {
      return (
        <img 
          src={icon.src} 
          alt={icon.label} 
          className="icon-img"
          onError={(e) => {
            console.warn(`Erreur lors du chargement de l'image: ${icon.src}`);
            // Fallback vers emoji si l'image ne charge pas
            if (icon.fallbackIcon) {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }
          }}
        />
      );
    }
    
    // Emoji ou texte par défaut
    return icon.icon || '📄';
  };

  return (
    <div
      ref={iconRef}
      className={`draggable-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''} ${launching ? 'launching' : ''}`}
      style={{
        left: icon.x + 'px',
        top: icon.y + 'px',
        '--icon-delay': icon.delay
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className={`icon-image ${icon.type}`}>
        {renderIcon()}
        
        {/* Fallback emoji caché par défaut, affiché si l'image échoue */}
        {(icon.useImage) && icon.fallbackIcon && (
          <div 
            className="fallback-emoji-hidden" 
            style={{ 
              display: 'none', 
              fontSize: '48px',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon.fallbackIcon}
          </div>
        )}
        
        {/* Badge de notification si présent */}
        {icon.notificationCount && (
          <div className="notification-badge">
            {icon.notificationCount > 99 ? '99+' : icon.notificationCount}
          </div>
        )}
      </div>
      <span className="icon-label">{icon.label}</span>
    </div>
  );
};

export default DraggableIcon; 