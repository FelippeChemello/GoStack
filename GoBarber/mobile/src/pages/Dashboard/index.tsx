import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Header,
    HeaderTitle,
    UserName,
    ProfileButton,
    UserAvatar,
    ProvidersList,
    ProvidersListTitle,
    ProviderContainer,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
    ProvidersListFooter,
} from './styles';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import { View } from 'react-native';

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

    const handleNavigateToCreateAppointment = useCallback(
        providerId => {
            navigate('CreateAppointment', { providerId });
        },
        [navigate]
    );

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
                ListHeaderComponent={() => {
                    return (
                        <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
                    );
                }}
                ListFooterComponent={() => {
                    return <ProvidersListFooter />;
                }}
                data={providers}
                keyExtractor={provider => provider.id}
                renderItem={({ item: provider }) => {
                    return (
                        <ProviderContainer
                            onPress={() =>
                                handleNavigateToCreateAppointment(provider.id)
                            }
                        >
                            <ProviderAvatar
                                source={{ uri: provider.avatarUrl }}
                            />

                            <ProviderInfo>
                                <ProviderName>{provider.name}</ProviderName>

                                <ProviderMeta>
                                    <Icon
                                        name="calendar"
                                        size={14}
                                        color="#ff9000"
                                    />
                                    <ProviderMetaText>
                                        Segunda à sexta
                                    </ProviderMetaText>
                                </ProviderMeta>

                                <ProviderMeta>
                                    <Icon
                                        name="clock"
                                        size={14}
                                        color="#ff9000"
                                    />
                                    <ProviderMetaText>
                                        8h às 18h
                                    </ProviderMetaText>
                                </ProviderMeta>
                            </ProviderInfo>
                        </ProviderContainer>
                    );
                }}
            />
        </Container>
    );
};

export default Dashboard;
