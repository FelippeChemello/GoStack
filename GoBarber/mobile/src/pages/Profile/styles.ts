import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.ScrollView`
    flex: 1;
    padding: 0 30px 128px;
    position: relative;
`;

export const BackButton = styled.TouchableOpacity`
    margin-top: 40px;
`;

export const Title = styled.Text`
    margin: 24px 0;
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
`;

export const UserAvatarButton = styled.TouchableOpacity`
    margin-top: 16px;
`;

export const UserAvatar = styled.Image`
    width: 186px;
    height: 186px;
    border-radius: 98px;
    align-self: center;
`;
