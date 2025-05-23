import React from 'react';
import { useLoadingState } from '../../hooks/useLoadingState';
import './LoadingTrigger.css';

const LoadingTrigger = () => {
  const { triggerLoadingScreen } = useLoadingState();

  const handleRestart = () => {
    triggerLoadingScreen();
  };

  return (
    <div className="loading-trigger">
      <button 
        className="restart-button"
        onClick={handleRestart}
        title="Redémarrer le Mac"
      >
        <img src="/icons/Apple_logo_black.svg" alt="Apple" className="apple-icon" />
        <span>Redémarrer</span>
      </button>
    </div>
  );
};

export default LoadingTrigger; 