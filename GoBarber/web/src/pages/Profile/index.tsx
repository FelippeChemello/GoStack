import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import { Container, Content, AvatarInput } from './style';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ProfileFormData {
    name: string;
    email: string;
    password: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const { user } = useAuth();

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
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
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft />
                    </Link>
                </div>
            </header>
            <Content>
                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{ name: user.name, email: user.email }}
                >
                    <AvatarInput>
                        <img src={user.avatarUrl} alt={user.name} />
                        <button type="button">
                            <FiCamera />
                        </button>
                    </AvatarInput>

                    <h1>Meu perfil</h1>

                    <Input placeholder="Nome" name="name" icon={FiUser} />

                    <Input placeholder="E-mail" name="email" icon={FiMail} />

                    <Input
                        containerStyle={{ marginTop: '24px' }}
                        type="password"
                        placeholder="Senha atual"
                        name="oldPassword"
                        icon={FiLock}
                    />

                    <Input
                        type="password"
                        placeholder="Nova senha"
                        name="password"
                        icon={FiLock}
                    />

                    <Input
                        type="password"
                        placeholder="Confirmar senha"
                        name="passwordConfirmation"
                        icon={FiLock}
                    />

                    <Button type="submit"> Confirmar mudanças </Button>
                </Form>
            </Content>
        </Container>
    );
};

export default Profile;
