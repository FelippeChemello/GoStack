import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Input from '../../components/Input';

jest.mock('@unform/core', () => {
    return {
        useField() {
            return {
                fieldName: 'email',
                defaultValue: '',
                error: '',
                registerField: jest.fn(),
            };
        },
    };
});

describe('Input Component', () => {
    beforeEach(() => {});

    it('should be able to render an input', async () => {
        const { getByPlaceholderText } = render(
            <Input name="email" placeholder="E-mail" />,
        );

        expect(getByPlaceholderText('E-mail')).toBeTruthy();
    });

    it('should highlight input container on focus and remove highlight on blur', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        );

        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container');

        fireEvent.focus(inputElement);

        await waitFor(() => {
            expect(containerElement).toHaveStyle('border-color: #ff9000');
            expect(containerElement).toHaveStyle('color: #ff9000');
        });

        fireEvent.blur(inputElement);

        await waitFor(() => {
            expect(containerElement).not.toHaveStyle('border-color: #ff9000');
            expect(containerElement).not.toHaveStyle('color: #ff9000');
        });
    });

    it('should keep icon highlight when input fulfilled', async () => {
        const { getByPlaceholderText, getByTestId } = render(
            <Input name="email" placeholder="E-mail" />,
        );

        const inputElement = getByPlaceholderText('E-mail');
        const containerElement = getByTestId('input-container');

        fireEvent.change(inputElement, {
            target: { value: 'johndoe@example.com.br' },
        });

        fireEvent.blur(inputElement);

        await waitFor(() => {
            expect(containerElement).toHaveStyle('color: #ff9000');
        });
    });
});
