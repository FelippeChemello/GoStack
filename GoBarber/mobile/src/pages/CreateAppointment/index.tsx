import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
} from './styles';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatarUrl: string;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { providerId } = route.params as RouteParams;
    const { goBack } = useNavigation();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(providerId);

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    const navigateBack = useCallback(() => {
        goBack();
    }, [goBack]);

    const handleSelectProvider = useCallback((id: string) => {
        setSelectedProvider(id);
    }, []);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatarUrl }} />
            </Header>

            <ProvidersListContainer>
                <ProvidersList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider.id}
                    renderItem={({ item: provider }) => {
                        return (
                            <ProviderContainer
                                onPress={() =>
                                    handleSelectProvider(provider.id)
                                }
                                selected={provider.id === selectedProvider}
                            >
                                <ProviderAvatar
                                    source={{ uri: provider.avatarUrl }}
                                />
                                <ProviderName
                                    selected={provider.id === selectedProvider}
                                >
                                    {provider.name}
                                </ProviderName>
                            </ProviderContainer>
                        );
                    }}
                ></ProvidersList>
            </ProvidersListContainer>
        </Container>
    );
};

export default CreateAppointment;
