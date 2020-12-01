import React from 'react';

import { Auth } from './Auth';

const AppProvider: React.FC = ({ children }) => {
    return <Auth>{children}</Auth>;
};

export default AppProvider;
