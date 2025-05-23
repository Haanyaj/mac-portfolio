import React from 'react';
import Screen2D from './components/Screen2D/Screen2D';
import MacLoadingScreen from './components/MacOS/MacLoadingScreen';
import { LoadingProvider, useLoadingState } from './hooks/useLoadingState';
import './App.css';

const AppContent = () => {
  const { isLoading, completeLoading } = useLoadingState();

  return (
    <div className="app screen2d-app">
      {isLoading ? (
        <MacLoadingScreen onLoadingComplete={completeLoading} />
      ) : (
        <Screen2D />
      )}
    </div>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
};

export default App; 