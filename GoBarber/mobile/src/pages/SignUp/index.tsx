import React, { useCallback, useRef } from 'react';
import {
    Image,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        formRef.current?.setErrors({});

        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'Minimo 6 caracteres'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            // await api.post('users', data);
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
                return;
            }

            Alert.alert(
                'Erro ao cadastrar',
                'Ocorreu um erro ao realizar o cadastro, tente novamente.'
            );
        }
    }, []);

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

                        <Form ref={formRef} onSubmit={handleSignUp}>
                            <Input
                                autoCorrect={true}
                                autoCapitalize="words"
                                name="name"
                                icon="user"
                                placeholder="Nome"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    emailInputRef.current?.focus()
                                }
                            />
                            <Input
                                ref={emailInputRef}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="email"
                                icon="mail"
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                            />
                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                textContentType="newPassword"
                                name="password"
                                icon="lock"
                                placeholder="Senha"
                                returnKeyType="send"
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
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
