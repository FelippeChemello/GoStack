import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
    ProvidersList,
} from './styles';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

export interface Provider {
    id: string;
    name: string;
    avatarUrl: string;
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();
    const [providers, setProviders] = useState<Provider[]>([]);

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    const handleNavigateToProfile = useCallback(() => {
        navigate('Profile');
    }, [navigate]);

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {'\n'}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={handleNavigateToProfile}>
                    <UserAvatar source={{ uri: user.avatarUrl }} />
                </ProfileButton>
            </Header>

            <ProvidersList
                data={providers}
                keyExtractor={provider => provider.id}
                renderItem={({ item }) => {
                    return <UserName>{item.name} </UserName>;
                }}
            />
        </Container>
    );
};

export default Dashboard;
