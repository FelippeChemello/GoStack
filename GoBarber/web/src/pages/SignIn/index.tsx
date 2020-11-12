import React from 'react';

import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './style';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <form>
                    <h1>Faça seu logon</h1>

                    <Input placeholder="E-mail" name="email" icon={FiMail} />

                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        icon={FiLock}
                    />

                    <Button type="submit"> Entrar </Button>

                    <a href="forgot"> Esqueci minha senha</a>
                </form>

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
