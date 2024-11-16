import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('info');

    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
        setAlertMessage(null);
        }, 3000);
    };

    const hideAlert = () => {
        setAlertMessage(null);
    };

    return (
        <AlertContext.Provider value={{ alertMessage, alertType, showAlert, hideAlert }}>
        {children}
        </AlertContext.Provider>
    );
    };

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
    };
