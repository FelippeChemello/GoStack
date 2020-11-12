import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons/lib';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...attributes }) => {
    return (
        <Container>
            {Icon && <Icon size={20} />}
            <input {...attributes} />
        </Container>
    );
};

export default Input;
