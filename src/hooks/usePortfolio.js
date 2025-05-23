import { useState, useEffect } from 'react';

export const usePortfolio = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeProject, setActiveProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProject = (projectId) => {
    setActiveProject(activeProject === projectId ? null : projectId);
  };

  return {
    // State
    currentTime,
    activeProject,
    activeSection,
    isMenuOpen,
    isDarkMode,
    isLoading,
    
    // Actions
    scrollToSection,
    toggleTheme,
    toggleMenu,
    toggleProject,
    setActiveSection
  };
}; 