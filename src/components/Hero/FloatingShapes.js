import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes = () => {
  return (
    <div className="hero-background">
      <div className="floating-shapes">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingShapes; 