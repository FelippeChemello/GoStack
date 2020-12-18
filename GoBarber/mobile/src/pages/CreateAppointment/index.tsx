import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    Content,
    ProvidersListContainer,
    ProvidersList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName,
    Calendar,
    Title,
    OpenDatePickeButton,
    OpenDatePickeButtonText,
    Schedule,
    Section,
    SectionTitle,
    SectionContent,
    Hour,
    HourText,
    CreateAppointmentButton,
    CreateAppointmentButtonText,
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

interface AvailabilityItem {
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { providerId } = route.params as RouteParams;
    const { goBack, navigate } = useNavigation();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(providerId);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
    const [selectedHour, setSelectedHour] = useState(0);

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
                setSelectedHour(0);
            }
        },
        []
    );

    const handleSelectHour = useCallback((hour: number) => {
        setSelectedHour(hour);
    }, []);

    const handleCreateAppointment = useCallback(async () => {
        try {
            const date = new Date(selectedDate.getTime());

            date.setHours(selectedHour);
            date.setMinutes(0);

            await api.post('appointments', {
                providerId: selectedProvider,
                date,
            });

            navigate('AppointmentCreated', { date: date.getTime() });
        } catch (err) {
            Alert.alert(
                'Erro ao criar agendamento',
                'Ocorreu um erro ao agendar seu serviço, tente novamente.'
            );
        }
    }, [navigate, selectedDate, selectedHour, selectedProvider]);

    const morningAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => {
                return hour < 12;
            })
            .map(({ hour, available }) => {
                return {
                    hour,
                    hourFormatted: format(
                        new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate(),
                            hour,
                            0
                        ),
                        'HH:mm'
                    ),
                    available,
                };
            });
    }, [availability]);

    const afternoonAvailability = useMemo(() => {
        return availability
            .filter(({ hour }) => {
                return hour >= 12;
            })
            .map(({ hour, available }) => {
                return {
                    hour,
                    hourFormatted: format(
                        new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate(),
                            hour,
                            0
                        ),
                        'HH:mm'
                    ),
                    available,
                };
            });
    }, [availability]);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatarUrl }} />
            </Header>

            <Content>
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
                                        selected={
                                            provider.id === selectedProvider
                                        }
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

                <Schedule>
                    <Title>Escolha o horário</Title>

                    <Section>
                        <SectionTitle>Manhã</SectionTitle>

                        <SectionContent>
                            {morningAvailability.map(
                                ({ hour, hourFormatted, available }) => {
                                    return (
                                        <Hour
                                            enabled={available}
                                            available={available}
                                            key={hourFormatted}
                                            selected={selectedHour === hour}
                                            onPress={() =>
                                                handleSelectHour(hour)
                                            }
                                        >
                                            <HourText
                                                selected={selectedHour === hour}
                                            >
                                                {hourFormatted}
                                            </HourText>
                                        </Hour>
                                    );
                                }
                            )}
                        </SectionContent>
                    </Section>

                    <Section>
                        <SectionTitle>Tarde</SectionTitle>

                        <SectionContent>
                            {afternoonAvailability.map(
                                ({ hour, hourFormatted, available }) => {
                                    return (
                                        <Hour
                                            enabled={available}
                                            available={available}
                                            key={hourFormatted}
                                            selected={selectedHour === hour}
                                            onPress={() =>
                                                handleSelectHour(hour)
                                            }
                                        >
                                            <HourText
                                                selected={selectedHour === hour}
                                            >
                                                {hourFormatted}
                                            </HourText>
                                        </Hour>
                                    );
                                }
                            )}
                        </SectionContent>
                    </Section>
                </Schedule>

                <CreateAppointmentButton onPress={handleCreateAppointment}>
                    <CreateAppointmentButtonText>
                        Agendar
                    </CreateAppointmentButtonText>
                </CreateAppointmentButton>
            </Content>
        </Container>
    );
};

export default CreateAppointment;
