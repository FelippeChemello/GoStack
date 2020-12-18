import { FlatList, RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { Provider } from '../Dashboard';

interface ProviderContainerProps {
    selected: boolean;
}

interface HourProps {
    available: boolean;
    selected: boolean;
}

interface HourTextProps {
    selected: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
    padding: 24px;
    padding-top: ${getStatusBarHeight() + 24}px;
    background: #28262e;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
    color: #f4ede8;
    font-family: 'RobotSlab-Medium';
    font-size: 20px;
    margin-left: 16px;
`;

export const UserAvatar = styled.Image`
    width: 56px;
    height: 56px;
    border-radius: 25px;
    margin-left: auto;
`;

export const Content = styled.ScrollView`
    margin-bottom: 128px;
`;

export const ProvidersListContainer = styled.View`
    height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
    padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
    background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
    flex-direction: row;
    padding: 8px 12px;
    align-items: center;
    margin-right: 16px;
    border-radius: 10px;
`;

export const ProviderName = styled.Text<ProviderContainerProps>`
    margin-left: 8px;
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: ${props => (props.selected ? '#232129' : '#f4ede8')};
`;

export const ProviderAvatar = styled.Image`
    height: 32px;
    width: 32px;
    border-radius: 16px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
    font-family: 'RobotoSlab-Medium';
    color: #f4ede8;
    font-size: 24px;
    margin: 0 24px 24px;
`;

export const OpenDatePickeButton = styled(RectButton)`
    height: 48px;
    background: #ff9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
`;

export const OpenDatePickeButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #232129;
`;

export const Schedule = styled.View`
    padding: 24px 0 16px;
`;

export const Section = styled.View`
    margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
    font-size: 18px;
    color: #999591;
    font-family: 'RobotoSlab-Regular';
    margin: 0 24px 24px;
`;

export const SectionContent = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingHorizontal: 24 },
    showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
    padding: 12px;
    background: ${props => (props.selected ? '#ff9000' : '#3e3b47')};
    border-radius: 10px;
    margin-right: 8px;

    opacity: ${props => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
    color: ${props => (props.selected ? '#252321' : '#f4ede8')};
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
    height: 56px;
    background: #ff9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px 24px;
`;

export const CreateAppointmentButtonText = styled.Text`
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #232129;
`;
