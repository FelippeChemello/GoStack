import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        font-size: 16px;
        line-height: 19px;
        color: #a8a8b3;
        display: flex;
        align-items: center;
        text-decoration: none;

        &:hover {
            color: ${shade(0.5, '#a8a8b3')};
        }
    }
`;

export const RepositoryInfos = styled.div`
    margin-top: 36px;

    header {
        margin-top: 70px;
        display: flex;
        align-items: center;

        img {
            border-radius: 50%;
            height: 120px;
            width: 120px;
        }

        div {
            margin: 0 32px;

            strong {
                font-weight: bold;
                font-size: 36px;
                line-height: 42px;
                color: #3d3d4d;
            }

            p {
                margin-top: 12px;
                font-size: 20px;
                line-height: 23px;
                color: #737380;
            }
        }
    }

    ul {
        display: flex;
        list-style: none;
        margin-top: 40px;

        li {
            & + li {
                margin-left: 80px;
            }

            strong {
                font-weight: bold;
                font-size: 36px;
                line-height: 42px;
                color: #3d3d4d;
            }

            p {
                font-size: 20px;
                line-height: 23px;
                color: #6c6c80;
                margin-top: 4px;
            }
        }
    }
`;

export const Issues = styled.div`
    margin-top: 70px;

    a {
        min-height: 112px;
        width: 100%;
        background: #fff;
        border-radius: 5px;
        padding: 28px;
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: transform 0.2s;

        &:hover {
            transform: translateX(10px);
        }

        & + a {
            margin-top: 16px;
        }

        strong {
            font-weight: bold;
            font-size: 24px;
            line-height: 28px;
            color: #3d3d4d;
        }

        p {
            margin-top: 8px;
            font-size: 18px;
            line-height: 21px;
            color: #a8a8b3;
        }

        svg {
            margin-left: auto;
            color: #c9c9d4;
        }
    }
`;

export const Loading = styled.div`
    display: flex;
    height: 1vh;
    width: 100%;
    height: 500px;
    justify-content: center;
    align-items: center;

    img {
        width: 150px;
    }
`;
