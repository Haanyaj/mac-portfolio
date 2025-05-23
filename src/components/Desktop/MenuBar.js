import React from 'react';
import { personalInfo } from '../../data/portfolio';

const MenuBar = ({ currentTime }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="menu-bar">
      <div className="menu-left">
        <div className="apple-logo">🍎</div>
        <span className="app-name">Portfolio - {personalInfo.name}</span>
      </div>
      
      <div className="menu-right">
        <div className="menu-item">🔋 100%</div>
        <div className="menu-item">📶</div>
        <div className="menu-item">🔊</div>
        <div className="menu-item time-date">
          <div>{formatTime(currentTime)}</div>
          <div className="date">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuBar; 