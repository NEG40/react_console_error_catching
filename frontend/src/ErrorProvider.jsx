import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const sendErrorToBackend = async (error, type) => {
    if (typeof error == 'object') error = JSON.stringify(error)
            
      // Filter out api key from error
      error = error?.replace(/Bearer .+?"/g, '<api_key>"') || error

      const data = {
          username: ['Chris', 'Elijah', 'Jessi'][Math.floor(Math.random() * 3)], // Get username from keycloak or similar
          url: window.location.href,
          type,
          error
      }


    await axios.post('/errors', data)
      .then(res => console.log('Successfully submitted error'))
      .catch(e => console.log('There was an issue submiting error', e))
  };

  const captureError = (error) => {
    setErrors((prevErrors) => [...prevErrors, error]);
    sendErrorToBackend(error);
  };

  useEffect(() => {
    // Override console.error
    const originalConsoleError = console.error;
    function handleConsoleError(...args) {

      const errorMessage =
        args[0]?.response
          ? JSON.stringify(args[0].response)
          : args.join(" ")

      if (errorMessage.includes('/errors')) return // Prevents an error loop

      sendErrorToBackend(errorMessage, 'console.error');

      // Call the original console.error
      originalConsoleError(...args);
    };
    console.error = handleConsoleError;

    // Handle uncaught exceptions
    function handleGlobalError(message, source, lineno, colno, error) {
      const errorMessage = `${message} at ${source}:${lineno}:${colno}\n${error}`;

      sendErrorToBackend(errorMessage, 'Uncaught exception');
    };
    window.onerror = handleGlobalError;

    // Handle unhandled promise rejections
    function handleUnhandledRejection(event) {
      sendErrorToBackend(event.reason, 'Unhandled Promise Rejection');
    };
    window.onunhandledrejection = handleUnhandledRejection;

    return () => {
      // Restore original handlers on unmount
      console.error = originalConsoleError;
      window.onerror = null;
      window.onunhandledrejection = null;
    };

  }, []);


  return (
    <ErrorContext.Provider value={{ errors, captureError }}>
      {children}
    </ErrorContext.Provider>
  );
};