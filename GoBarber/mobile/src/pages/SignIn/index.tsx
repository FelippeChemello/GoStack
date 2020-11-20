import React from 'react';
import { Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';
import { ScrollView } from 'react-native-gesture-handler';

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Container>
                        <Image source={logoImg} />

                        {/* Os Textos não são animados no RN, como utilizamos o KeyboardAvoidingView que causa uma animação para mostrar o teclado, devemos utilizar uma View ao redor de textos para conseguir animar  */}
                        <View>
                            <Title>Faça seu login</Title>
                        </View>

                        <Input name="email" icon="mail" placeholder="E-mail" />
                        <Input
                            name="password"
                            icon="lock"
                            placeholder="Senha"
                        />

                        <Button onPress={() => console.log('Entrar')}>
                            {' '}
                            Entrar{' '}
                        </Button>

                        <ForgotPassword
                            onPress={() => console.log('Esqueci minha senha')}
                        >
                            <ForgotPasswordText>
                                Esqueci minha senha
                            </ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                <Icon name="log-in" size={20} color="#ff9000" />

                <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    );
};

export default SignIn;
