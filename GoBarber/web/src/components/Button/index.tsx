import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {} - Também pode ser escrito como a seguir
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...attributes }) => {
    return (
        <Container type="button" {...attributes}>
            {children}
        </Container>
    );
};

export default Button;
