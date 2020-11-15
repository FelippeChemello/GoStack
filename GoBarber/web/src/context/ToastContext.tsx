import React, { createContext, useCallback, useContext } from 'react';
import ToastNotification from '../components/ToastNotification';

interface ToastContextInterface {
    addToast(): void;
    removeToast(): void;
}

const ToastContext = createContext<ToastContextInterface>(
    {} as ToastContextInterface,
);

const ToastProvider: React.FC = ({ children }) => {
    const addToast = useCallback(() => {
        console.log('AddToast');
    }, []);

    const removeToast = useCallback(() => {
        console.log('RemoveToast');
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}

            <ToastNotification />
        </ToastContext.Provider>
    );
};

function useToast(): ToastContextInterface {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast };
