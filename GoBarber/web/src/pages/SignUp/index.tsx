import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './style';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/ToastContext';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
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

                addToast({
                    type: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    description: 'Você já pode fazer seu login no GoBarber.',
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
                    title: 'Erro ao cadastrar',
                    description:
                        'Ocorreu um erro ao realizar o cadastro, tente novamente.',
                });
            }
        },
        [addToast, history],
    );

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input placeholder="Nome" name="name" icon={FiUser} />

                        <Input
                            placeholder="E-mail"
                            name="email"
                            icon={FiMail}
                        />

                        <Input
                            type="password"
                            placeholder="Senha"
                            name="password"
                            icon={FiLock}
                        />

                        <Button type="submit"> Cadastrar </Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para login
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
