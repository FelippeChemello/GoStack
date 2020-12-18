import React, { useCallback, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
    Container,
    Title,
    UserAvatarButton,
    UserAvatar,
    BackButton,
} from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const oldPasswordInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const passwordConfirmationInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(
        async (data: SignUpFormData) => {
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

                await api.post('users', data);

                Alert.alert(
                    'Cadastro realizado com sucesso!',
                    'Você já pode fazer login na aplicação.'
                );

                navigation.navigate('SignIn');
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
        },
        [navigation]
    );

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
                        <BackButton onPress={() => navigation.goBack()}>
                            <Icon
                                name="chevron-left"
                                size={32}
                                color="#999591"
                            />
                        </BackButton>

                        <UserAvatarButton onPress={() => {}}>
                            <UserAvatar source={{ uri: user.avatarUrl }} />
                        </UserAvatarButton>

                        <View>
                            <Title>Meu perfil</Title>
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
                                    oldPasswordInputRef.current?.focus()
                                }
                            />

                            <Input
                                ref={oldPasswordInputRef}
                                secureTextEntry
                                textContentType="password"
                                name="oldPassword"
                                icon="lock"
                                placeholder="Senha atual"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current?.focus()
                                }
                                containerStyle={{ marginTop: 16 }}
                            />

                            <Input
                                ref={passwordInputRef}
                                secureTextEntry
                                textContentType="newPassword"
                                name="password"
                                icon="lock"
                                placeholder="Nova senha"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordConfirmationInputRef.current?.focus()
                                }
                            />

                            <Input
                                ref={passwordConfirmationInputRef}
                                secureTextEntry
                                textContentType="newPassword"
                                name="passwordConfirmation"
                                icon="lock"
                                placeholder="Confirmar senha"
                                returnKeyType="send"
                                onSubmitEditing={() =>
                                    formRef.current?.submitForm()
                                }
                            />

                            <Button
                                onPress={() => formRef.current?.submitForm()}
                            >
                                Confirmar mudanças
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

export default SignUp;
