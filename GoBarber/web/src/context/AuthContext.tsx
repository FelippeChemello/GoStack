import React, { createContext, useCallback } from 'react';

import api from '../services/api';

interface SignInCredentialsInterface {
    email: string;
    password: string;
}

interface AuthContextInterface {
    name: string;
    signIn(credentials: SignInCredentialsInterface): Promise<void>;
}

// É necessário iniciar um contexto com um valor default, porém não faz sentido ter um valor inicial neste caso,
// para "burlar" a tipagem, devemos dizer que o objeto vazio é a interface desejada, dessa forma ele vai permitir passar o erro
export const AuthContext = createContext<AuthContextInterface>(
    {} as AuthContextInterface,
);

export const AuthProvider: React.FC = ({ children }) => {
    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', { email, password });

        console.log(response.data);
    }, []);

    // Context.Provider -> Prove os dados no valor para todos os componentes filhos que estão dentro dele, com isso os componentes tem acesso a esse valor
    return (
        <AuthContext.Provider value={{ name: 'Felippe', signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
