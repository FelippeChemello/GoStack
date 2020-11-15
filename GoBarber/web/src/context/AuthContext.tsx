import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface SignInCredentialsInterface {
    email: string;
    password: string;
}

interface AuthContextInterface {
    user: object;
    signIn(credentials: SignInCredentialsInterface): Promise<void>;
}

interface AuthState {
    token: string;
    user: object;
}

// É necessário iniciar um contexto com um valor default, porém não faz sentido ter um valor inicial neste caso,
// para "burlar" a tipagem, devemos dizer que o objeto vazio é a interface desejada, dessa forma ele vai permitir passar o erro
const AuthContext = createContext<AuthContextInterface>(
    {} as AuthContextInterface,
);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@GoBarber:token');
        const user = localStorage.getItem('@GoBarber:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', { email, password });

        const { token, user } = response.data;

        localStorage.setItem('@GoBarber:token', token);
        localStorage.setItem('@GoBarber:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    // Context.Provider -> Prove os dados no valor para todos os componentes filhos que estão dentro dele, com isso os componentes tem acesso a esse valor
    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextInterface {
    const context = useContext(AuthContext); // Busca os dados do contexto ao qual está inserido

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
