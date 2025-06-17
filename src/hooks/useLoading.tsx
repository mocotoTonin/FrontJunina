
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Increased from 2000ms to 3000ms

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleStartLoading = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    window.addEventListener('startLoading', handleStartLoading);
    
    return () => {
      window.removeEventListener('startLoading', handleStartLoading);
    };
  }, []);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return { isLoading, startLoading, stopLoading };
};
