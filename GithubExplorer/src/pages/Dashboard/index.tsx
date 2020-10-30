import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Title, Form, Error, Repositories } from './styles';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FunctionComponent = () => {
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepositories = localStorage.getItem(
            '@GithubExplorer:repositories',
        );

        // Valor inicial da variavel será o retornado pela função
        if (storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }

        return [];
    });
    const [repositoryName, setRepositoryName] = useState('');
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        localStorage.setItem(
            '@GithubExplorer:repositories',
            JSON.stringify(repositories),
        );
    }, [repositories]);

    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        if (!repositoryName) {
            setInputError('Digite o <autor>/<nome> do repositório');
            return;
        }

        try {
            const response = await api.get(`repos/${repositoryName}`);

            setRepositories([...repositories, response.data as Repository]);
            setRepositoryName('');
            setInputError('');
        } catch (err) {
            setInputError('Ocorreu um erro ao buscar esse repositório');
        }
    }

    return (
        <>
            <img src={logoImg} alt="Github explorer" />
            <Title> Explore repositórios no Github </Title>

            <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
                <input
                    placeholder="Digite o nome do repositório"
                    value={repositoryName}
                    onChange={event => setRepositoryName(event.target.value)}
                />
                <button type="submit"> Pesquisar </button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositories>
                {repositories.map(repository => {
                    return (
                        <a key={repository.full_name} href="teste">
                            <img
                                src={repository.owner.avatar_url}
                                alt={repository.owner.login}
                            />
                            <div>
                                <strong>{repository.full_name}</strong>
                                <p>{repository.description}</p>
                            </div>

                            <FiChevronRight size={20} color="#cbcd6" />
                        </a>
                    );
                })}
            </Repositories>
        </>
    );
};

export default Dashboard;
