import styled from 'styled-components/native';

export const Container = styled.View``;

export const Header = styled.View`
    padding: 24px;
    padding-top: 24px;
    background: #28262e;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
    color: #f5ede8;
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
