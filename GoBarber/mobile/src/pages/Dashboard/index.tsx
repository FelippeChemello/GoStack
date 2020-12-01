import React from 'react';
import { View, Text } from 'react-native';

import Button from '../../components/Button';

import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Button onPress={() => signOut()}>Sair</Button>
        </View>
    );
};

export default Dashboard;
