import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfos, Issues } from './styles';

const Repository: React.FunctionComponent = () => {
    return (
        <>
            <Header>
                <img src={logoImg} alt="Github explorer" />
                <Link to="/">
                    <FiChevronLeft size={20} />
                    Voltar
                </Link>
            </Header>
            <RepositoryInfos>
                <header>
                    <img src="https://picsum.photos/200" alt="" />
                    <div>
                        <strong>FelippeChemello/FelippeChemello</strong>
                        <p>Descrição do Repo</p>
                    </div>
                </header>

                <ul>
                    <li>
                        <strong> 1808 </strong>
                        <p> Stars </p>
                    </li>

                    <li>
                        <strong> 48 </strong>
                        <p> Forks </p>
                    </li>

                    <li>
                        <strong> 67 </strong>
                        <p> Issues abertas </p>
                    </li>
                </ul>
            </RepositoryInfos>

            <Issues>
                <Link to="github">
                    <div>
                        <strong>Nome da Issue</strong>
                        <p> Autor da Issue </p>
                    </div>

                    <FiChevronRight size={32} />
                </Link>
            </Issues>
        </>
    );
};

export default Repository;
