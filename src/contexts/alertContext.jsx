import React, { createContext, useState, useContext } from 'react';
import { ALERT_AUTO_HIDE_DURATION } from '../constants/app.constants';

const AlertContext = createContext(undefined);

export const AlertProvider = ({ children }) => {
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('info');

    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(null);
        }, ALERT_AUTO_HIDE_DURATION);
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
