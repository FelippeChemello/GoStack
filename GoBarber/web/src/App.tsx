import React from 'react';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import ToastNotification from './components/ToastNotification';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
    return (
        <>
            <AuthProvider>
                <SignIn />
            </AuthProvider>

            <ToastNotification />

            <GlobalStyle />
        </>
    );
};

export default App;
