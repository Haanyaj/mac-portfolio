import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const triggerLoadingScreen = () => {
    setIsLoading(true);
  };

  const completeLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{
      isLoading,
      triggerLoadingScreen,
      completeLoading
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingState = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingState must be used within a LoadingProvider');
  }
  return context;
}; 