import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const sendErrorToBackend = async (error) => {
    const data = {
      username: ['Chris', 'Elijah', 'Jessi'][Math.floor(Math.random() * 3)], // Get username from keycloak or similar
      error: error
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
    console.error = (...args) => {
      const errorMessage = args.join(" ");
      captureError(errorMessage);
      originalConsoleError(...args); // Call the original console.error
    };

    // Handle uncaught exceptions
    const handleGlobalError = (message, source, lineno, colno, error) => {
      const errorMessage = `${message} at ${source}:${lineno}:${colno}`;
      captureError(errorMessage);
    };
    window.onerror = handleGlobalError;

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      const errorMessage = `Unhandled Promise Rejection: ${event.reason}`;
      captureError(errorMessage);
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