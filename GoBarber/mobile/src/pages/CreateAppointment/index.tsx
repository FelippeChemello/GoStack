import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    Calendar,
    Title,
    OpenDatePickeButton,
    OpenDatePickeButtonText,
} from './styles';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';
import { Platform } from 'react-native';

interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatarUrl: string;
}

interface AvailabilityItem {
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { providerId } = route.params as RouteParams;
    const { goBack } = useNavigation();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(providerId);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availability, setAvailability] = useState<AvailabilityItem[]>([]);

    useEffect(() => {
        api.get('providers').then(response => {
            setProviders(response.data);
        });
    }, []);

    useEffect(() => {
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            },
        }).then(response => {
            setAvailability(response.data);
        });
    }, [selectedDate, selectedProvider]);

    const navigateBack = useCallback(() => {
        goBack();
    }, [goBack]);

    const handleSelectProvider = useCallback((id: string) => {
        setSelectedProvider(id);
    }, []);

    const handleToggleDatePicker = useCallback(() => {
        setShowDatePicker(oldState => !oldState);
    }, []);

    const handleDateChange = useCallback(
        (event: any, date: Date | undefined) => {
            if (Platform.OS === 'android') {
                setShowDatePicker(false);
            }

            if (date) {
                setSelectedDate(date);
            }
        },
        []
    );

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

            <Calendar>
                <Title>Escolha a data</Title>

                <OpenDatePickeButton onPress={handleToggleDatePicker}>
                    <OpenDatePickeButtonText>
                        Selecionar data
                    </OpenDatePickeButtonText>
                </OpenDatePickeButton>

                {showDatePicker && (
                    <DateTimePicker
                        mode="date"
                        display="calendar"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                )}
            </Calendar>
        </Container>
    );
};

export default CreateAppointment;
