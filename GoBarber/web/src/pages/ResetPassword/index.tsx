import React, { useCallback, useContext, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../context/ToastContext';

interface ResetPasswordFormData {
    password: string;
    passwordConfirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: ResetPasswordFormData) => {
            formRef.current?.setErrors({});

            try {
                const schema = Yup.object().shape({
                    password: Yup.string().required('Senha obrigatória'),
                    passwordConfirmation: Yup.string().oneOf(
                        [Yup.ref('password')],
                        'Confirmação de senha não coincide',
                    ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro ao resetar senha',
                    description:
                        'Ocorreu um erro ao resetar sua senha, tente novamente.',
                });
            }
        },
        [addToast, history],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resetar senha</h1>

                        <Input
                            type="password"
                            placeholder="Nova senha"
                            name="password"
                            icon={FiLock}
                        />

                        <Input
                            type="password"
                            placeholder="Repita a senha"
                            name="passwordConfirmation"
                            icon={FiLock}
                        />

                        <Button type="submit"> Alterar senha </Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ResetPassword;
