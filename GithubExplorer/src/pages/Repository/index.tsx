import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Header, RepositoryInfos, Issues, Loading } from './styles';
import loadingImg from '../../assets/tail-spin.svg';

interface RepositoryRouteParams {
    name: string;
}

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

interface Issue {
    title: string;
    id: number;
    html_url: string;
    user: {
        login: string;
    };
}

const Repository: React.FunctionComponent = () => {
    const { params } = useRouteMatch<RepositoryRouteParams>();
    const [repositoryData, setRepositoryData] = useState<Repository | null>(
        null,
    );
    const [repositoryIssues, setRepositoryIssues] = useState<Issue[]>([]);

    useEffect(() => {
        api.get(`repos/${params.name}`).then(response => {
            setRepositoryData(response.data);
        });

        api.get(`repos/${params.name}/issues`).then(response => {
            setRepositoryIssues(response.data);
        });
    }, [params.name]);

    if (!repositoryData) {
        return (
            <Loading>
                <img src={loadingImg} alt="Carregando" />
            </Loading>
        );
    }

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
                    <img
                        src={repositoryData.owner.avatar_url}
                        alt={repositoryData.owner.login}
                    />
                    <div>
                        <strong>{repositoryData.full_name}</strong>
                        <p>{repositoryData.description}</p>
                    </div>
                </header>

                <ul>
                    <li>
                        <strong> {repositoryData.stargazers_count} </strong>
                        <p> Stars </p>
                    </li>

                    <li>
                        <strong> {repositoryData.forks_count} </strong>
                        <p> Forks </p>
                    </li>

                    <li>
                        <strong> {repositoryData.open_issues_count} </strong>
                        <p> Issues abertas </p>
                    </li>
                </ul>
            </RepositoryInfos>

            <Issues>
                {repositoryIssues.map(issue => (
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={32} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;
