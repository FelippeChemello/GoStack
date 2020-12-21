import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useHistory: () => ({
            push: mockedHistoryPush,
        }),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

jest.mock('../../hooks/AuthContext', () => {
    return {
        useAuth: () => {
            return {
                signIn: mockedSignIn,
            };
        },
    };
});

jest.mock('../../hooks/ToastContext', () => {
    return {
        useToast: () => {
            return {
                addToast: mockedAddToast,
            };
        },
    };
});

describe('SignIn Page', () => {
    beforeEach(() => {
        mockedHistoryPush.mockClear();
    });

    it('should be able to sign in', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'johndoe@example.com' },
        });

        fireEvent.change(passwordField, {
            target: { value: '123456' },
        });

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
        });
    });

    it('should not be able to login with invalid credentials', async () => {
        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'invalid-email' },
        });

        fireEvent.change(passwordField, {
            target: { value: '123456' },
        });

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockedHistoryPush).not.toHaveBeenCalled();
        });
    });

    it('should not be able to login with unknown error, likely api error, showing toast error', async () => {
        mockedSignIn.mockImplementation(() => {
            throw new Error();
        });

        const { getByPlaceholderText, getByText } = render(<SignIn />);

        const emailField = getByPlaceholderText('E-mail');
        const passwordField = getByPlaceholderText('Senha');
        const buttonElement = getByText('Entrar');

        fireEvent.change(emailField, {
            target: { value: 'johndoe@example.com' },
        });

        fireEvent.change(passwordField, {
            target: { value: '123456' },
        });

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(mockedAddToast).toHaveBeenCalledWith(
                expect.objectContaining({
                    type: 'error',
                }),
            );
        });
    });
});
