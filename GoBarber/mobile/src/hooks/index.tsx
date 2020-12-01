import React from 'react';

import { AuthProvider } from './Auth';

const AppProvider: React.FC = ({ children }) => {
    return <AuthProvider></AuthProvider>;
};

export default AppProvider;
