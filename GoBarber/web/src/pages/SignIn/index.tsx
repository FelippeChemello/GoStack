import React, { useCallback, useContext, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn, user } = useAuth();
    const { addToast, removeToast } = useToast();

    console.log(user);

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            formRef.current?.setErrors({});

            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                }

                addToast();
            }
        },
        [signIn, addToast],
    );

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>

                    <Input placeholder="E-mail" name="email" icon={FiMail} />

                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        icon={FiLock}
                    />

                    <Button type="submit"> Entrar </Button>

                    <a href="forgot"> Esqueci minha senha</a>
                </Form>

                <a href="signup">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    );
};

export default SignIn;
