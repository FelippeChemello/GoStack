import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {} - Também pode ser escrito como a seguir
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
    children,
    loading,
    ...attributes
}) => {
    return (
        <Container type="button" {...attributes} disabled={Boolean(loading)}>
            {loading ? (
                <ReactLoading
                    type="spin"
                    color="#312e38"
                    height={32}
                    width={32}
                />
            ) : (
                children
            )}
        </Container>
    );
};

export default Button;
