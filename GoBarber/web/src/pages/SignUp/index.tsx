import React from 'react';

import { FiArrowLeft, FiLock, FiLogIn, FiMail, FiUser } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <form>
                    <h1>Faça seu cadastro</h1>

                    <Input placeholder="Nome" name="name" icon={FiUser} />

                    <Input placeholder="E-mail" name="email" icon={FiMail} />

                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        icon={FiLock}
                    />

                    <Button type="submit"> Cadastrar </Button>
                </form>

                <a href="signup">
                    <FiArrowLeft />
                    Voltar para login
                </a>
            </Content>
        </Container>
    );
};

export default SignUp;
