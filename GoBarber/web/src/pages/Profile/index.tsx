import React, { ChangeEvent, useCallback, useRef } from 'react';
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
    oldPassword: string;
    password: string;
    passwordConfirmation: string;
}

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const { user, updateUser } = useAuth();

    const handleChangeAvatar = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
                const data = new FormData();

                data.append('avatar', event.target.files[0]);

                api.patch('/users/avatar', data).then(response => {
                    updateUser(response.data);

                    addToast({ type: 'success', title: 'Avatar atualizado!' });
                });
            }
        },
        [addToast],
    );

    const handleSubmit = useCallback(
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
                            'Confirmação de senha não coincide',
                        ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const response = await api.put('profile', data);

                updateUser(response.data);

                addToast({
                    type: 'success',
                    title: 'Perfil atualizado com sucesso!',
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
                    title: 'Erro ao atualizar seus dados',
                    description:
                        'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
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
                        <label htmlFor="avatar">
                            <FiCamera />

                            <input
                                type="file"
                                id="avatar"
                                onChange={handleChangeAvatar}
                            />
                        </label>
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
