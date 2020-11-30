import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
    const { registerField, defaultValue = '', fieldName, error } = useField(
        name
    );
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue: (ref: any, value: string) => {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue: () => {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container>
            <Icon name={icon} size={20} color="#666360" />

            <TextInput
                {...rest}
                ref={inputElementRef}
                placeholderTextColor="#666360"
                keyboardAppearance="dark"
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
            />
        </Container>
    );
};

export default Input;
