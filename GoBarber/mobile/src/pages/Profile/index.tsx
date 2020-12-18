import React, { useCallback, useRef } from 'react';
import { View, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';

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

interface ProfileFormData {
    name: string;
    email: string;
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

const SignUp: React.FC = () => {
    const { user, updateUser } = useAuth();
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const oldPasswordInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const passwordConfirmationInputRef = useRef<TextInput>(null);

    const handleSignUp = useCallback(
        async (data: ProfileFormData) => {
            formRef.current?.setErrors({});

            try {
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    oldPassword: Yup.string(),
                    password: Yup.string().when('oldPassword', {
                        is: value => Boolean(value.length),
                        then: Yup.string().required('Campo obrigatório'),
                        otherwise: Yup.string(),
                    }),
                    passwordConfirmation: Yup.string()
                        .when('oldPassword', {
                            is: value => Boolean(value.length),
                            then: Yup.string().required('Campo obrigatório'),
                            otherwise: Yup.string(),
                        })
                        .oneOf(
                            [Yup.ref('password')],
                            'Confirmação de senha não coincide'
                        ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const response = await api.put('profile', data);

                updateUser(response.data);

                Alert.alert('Perfil atualizado com sucesso!');

                navigation.goBack();
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    return;
                }

                Alert.alert(
                    'Erro ao atualizar seu perfil',
                    'Ocorreu um erro ao atualizar seu perfil, tente novamente.'
                );
            }
        },
        [navigation, updateUser]
    );

    const handleUpdateAvatar = useCallback(() => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.didCancel) {
                return;
            }

            if (response.errorMessage) {
                Alert.alert('Erro ao atualizar seu avatar');
                return;
            }

            const data = new FormData();

            data.append('avatar', {
                type: 'image/jpeg',
                uri: response.uri,
                name: `${user.id}.jpg`,
            });

            api.patch('users/avatar', data).then(apiResponse => {
                updateUser(apiResponse.data);
            });
        });
    }, [updateUser, user.id]);

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

                        <UserAvatarButton onPress={handleUpdateAvatar}>
                            <UserAvatar source={{ uri: user.avatarUrl }} />
                        </UserAvatarButton>

                        <View>
                            <Title>Meu perfil</Title>
                        </View>

                        <Form
                            ref={formRef}
                            onSubmit={handleSignUp}
                            initialData={{ name: user.name, email: user.email }}
                        >
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
