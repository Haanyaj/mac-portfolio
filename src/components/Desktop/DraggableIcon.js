import React, { useState, useRef } from 'react';
import './DraggableIcon.css';

const DraggableIcon = ({ icon, onMove, onSelect, onDoubleClick, isSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
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
    
    const newY = Math.max(24, Math.min(
      e.clientY - desktopRect.top - dragOffset.y,
      desktopRect.height - iconHeight - 100
    ));
    
    onMove(icon.id, newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
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

  return (
    <div
      ref={iconRef}
      className={`draggable-icon ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ 
        left: icon.x, 
        top: icon.y,
        '--icon-delay': icon.delay
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className={`icon-image ${icon.type}`}>
        {icon.useImage ? (
          <img src={icon.src} alt={icon.label} className="icon-img" />
        ) : (
          <span className="icon-emoji">{icon.icon}</span>
        )}
      </div>
      <span className="icon-label">{icon.label}</span>
    </div>
  );
};

export default DraggableIcon; 