import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    containerStyle?: object;
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
    { containerStyle = {}, name, icon, ...rest },
    ref
) => {
    const { registerField, defaultValue = '', fieldName, error } = useField(
        name
    );
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback(() => setIsFocused(true), []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        if (inputValueRef.current.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

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
        <Container
            style={containerStyle}
            isFocused={isFocused}
            isErrored={Boolean(error)}
        >
            <Icon
                name={icon}
                size={20}
                color={isFocused || isFilled ? '#ff9000' : '#666360'}
            />

            <TextInput
                {...rest}
                ref={inputElementRef}
                placeholderTextColor="#666360"
                keyboardAppearance="dark"
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
            />
        </Container>
    );
};

export default forwardRef(Input);
