import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...attributes }) => {
    const { fieldName, defaultValue, error, registerField } = useField(
        attributes.name,
    );
    const inputRef = useRef(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            {Icon && <Icon size={20} />}
            <input defaultValue={defaultValue} ref={inputRef} {...attributes} />
        </Container>
    );
};

export default Input;
