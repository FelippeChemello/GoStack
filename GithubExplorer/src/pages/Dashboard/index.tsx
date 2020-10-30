import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FunctionComponent = () => {
    return (
        <>
            <img src={logoImg} alt="Github explorer" />
            <Title> Explore repositórios no Github </Title>

            <Form action="">
                <input placeholder="Digite o nome do repositório" />
                <button type="submit"> Pesquisar </button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img src="https://picsum.photos/200" alt="Profile" />
                    <div>
                        <strong>Nome</strong>
                        <p>Descrição</p>
                    </div>

                    <FiChevronRight size={20} color="#cbcd6" />
                </a>

                <a href="teste">
                    <img src="https://picsum.photos/200" alt="Profile" />
                    <div>
                        <strong>Nome</strong>
                        <p>Descrição</p>
                    </div>

                    <FiChevronRight size={20} color="#cbcd6" />
                </a>

                <a href="teste">
                    <img src="https://picsum.photos/200" alt="Profile" />
                    <div>
                        <strong>Nome</strong>
                        <p>Descrição</p>
                    </div>

                    <FiChevronRight size={20} color="#cbcd6" />
                </a>
            </Repositories>
        </>
    );
};

export default Dashboard;
