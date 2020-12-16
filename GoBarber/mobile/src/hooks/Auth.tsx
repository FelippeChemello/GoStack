import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface SignInCredentialsInterface {
    email: string;
    password: string;
}

interface UserData {
    avatar: string;
    avatarUrl: string;
    email: string;
    id: string;
    name: string;
}

interface AuthContextInterface {
    user: UserData;
    signIn(credentials: SignInCredentialsInterface): Promise<void>;
    signOut(): void;
    loading: boolean;
}

interface AuthState {
    token: string;
    user: UserData;
}

// É necessário iniciar um contexto com um valor default, porém não faz sentido ter um valor inicial neste caso,
// para "burlar" a tipagem, devemos dizer que o objeto vazio é a interface desejada, dessa forma ele vai permitir passar o erro
const AuthContext = createContext<AuthContextInterface>(
    {} as AuthContextInterface
);

export const Auth: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user',
            ]);

            if (token[1] && user[1]) {
                setData({ token: token[1], user: JSON.parse(user[1]) });
                api.defaults.headers.authorization = `Bearer ${token[1]}`;
            }

            setLoading(false);
        }

        loadStoragedData();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', { email, password });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)],
        ]);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

        setData({} as AuthState);
    }, []);

    // Context.Provider -> Prove os dados no valor para todos os componentes filhos que estão dentro dele, com isso os componentes tem acesso a esse valor
    return (
        <AuthContext.Provider
            value={{ user: data.user, signIn, signOut, loading }}
        >
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
