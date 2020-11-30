import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';
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

interface InputRef {
    focus(): void;
}

// React.FC => Function Component (Não passa a ref para dentro do componente por parâmetro)
// React.ForwardRefRenderFunction => Ref Fowarding Component[deprecated] (Permite a passagem da referência por parâmetro)
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    { name, icon, ...rest },
    ref
) => {
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

    useImperativeHandle(ref, () => {
        return {
            focus() {
                inputElementRef.current.focus();
            },
        };
    });

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

export default forwardRef(Input);
