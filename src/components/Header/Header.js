import React from 'react';
import { motion } from 'framer-motion';
import { Code, Calendar, Clock, Sun, Moon, Menu, X } from 'lucide-react';
import { navigation } from '../../data/portfolio';
import './Header.css';

const Header = ({ 
  currentTime, 
  activeSection, 
  isMenuOpen, 
  isDarkMode, 
  scrollToSection, 
  toggleTheme, 
  toggleMenu 
}) => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="nav-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          <Code className="logo-icon" />
          <span className="logo-text">DevPortfolio</span>
        </motion.div>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          {navigation.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="time-display">
            <Calendar size={16} />
            <span>{currentTime.toLocaleDateString('fr-FR', { 
              month: 'short', day: 'numeric' 
            })}</span>
            <Clock size={16} />
            <span>{currentTime.toLocaleTimeString('fr-FR', { 
              hour: '2-digit', minute: '2-digit' 
            })}</span>
          </div>

          <motion.button 
            className="theme-toggle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header; 