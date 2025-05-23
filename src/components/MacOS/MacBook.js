import React from 'react';
import Desktop from '../Desktop/Desktop';
import './MacBook.css';

const MacBook = () => {
  return (
    <div className="macbook-container">
      <div className="macbook">
        {/* Écran du MacBook */}
        <div className="macbook-screen">
          <div className="screen-bezel">
            <div className="screen-content">
              <Desktop />
            </div>
          </div>
          {/* Caméra */}
          <div className="camera">
            <div className="camera-dot"></div>
          </div>
        </div>
        
        {/* Base du MacBook */}
        <div className="macbook-base">
          <div className="trackpad"></div>
          <div className="keyboard">
            <div className="keyboard-keys"></div>
          </div>
        </div>
      </div>
      
      {/* Ombre du MacBook */}
      <div className="macbook-shadow"></div>
    </div>
  );
};

export default MacBook; 