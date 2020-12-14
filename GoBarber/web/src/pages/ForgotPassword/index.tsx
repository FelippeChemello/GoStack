import React, { useCallback, useContext, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../context/ToastContext';

interface ForgotPasswordFormData {
    email: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            formRef.current?.setErrors({});

            try {
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro ao recuperar senha',
                    description:
                        'Ocorreu um erro ao tentar recuperar a senha, tente novamente.',
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
                        <h1>Recuperar senha</h1>

                        <Input
                            placeholder="E-mail"
                            name="email"
                            icon={FiMail}
                        />

                        <Button type="submit"> Recuperar </Button>
                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
