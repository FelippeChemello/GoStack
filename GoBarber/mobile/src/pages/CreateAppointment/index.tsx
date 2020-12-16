import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
} from './styles';

import { useAuth } from '../../hooks/Auth';

interface RouteParams {
    providerId: string;
}

const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { providerId } = route.params as RouteParams;
    const { goBack } = useNavigation();

    const navigateBack = useCallback(() => {
        goBack();
    }, [goBack]);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>

                <HeaderTitle>Cabeleireiros</HeaderTitle>

                <UserAvatar source={{ uri: user.avatarUrl }} />
            </Header>
        </Container>
    );
};

export default CreateAppointment;
