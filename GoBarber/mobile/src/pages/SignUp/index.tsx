import React, { useRef } from 'react';
import { Image, View, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

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
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form
                            ref={formRef}
                            onSubmit={(data: object) => console.log(data)}
                        >
                            <Input name="name" icon="user" placeholder="Nome" />
                            <Input
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                            />
                            <Input
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                            />

                            <Button
                                onPress={() => formRef.current?.submitForm()}
                            >
                                Entrar
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignIn onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={20} color="#fff" />

                <BackToSignInText>Voltar para login</BackToSignInText>
            </BackToSignIn>
        </>
    );
};

export default SignUp;
