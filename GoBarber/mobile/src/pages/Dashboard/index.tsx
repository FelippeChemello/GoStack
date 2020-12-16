import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
} from './styles';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth();
    const { navigate } = useNavigation();

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
        </Container>
    );
};

export default Dashboard;
