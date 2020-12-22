import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/AuthContext';

import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth Hook', () => {
    it('should be able to SignIn', async () => {
        const apiResponse = {
            user: {
                id: 'userId',
                name: 'John Doe',
                email: 'johndoe@example.com.br',
            },
            token: 'token-123',
        };

        apiMock.onPost('sessions').reply(200, apiResponse);

        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        result.current.signIn({
            email: 'johndoe@example.com.br',
            password: '123456',
        });

        await waitForNextUpdate();

        expect(setItemSpy).toHaveBeenCalledWith(
            '@GoBarber:token',
            apiResponse.token,
        );
        expect(setItemSpy).toHaveBeenCalledWith(
            '@GoBarber:user',
            JSON.stringify(apiResponse.user),
        );
        expect(result.current.user.email).toEqual('johndoe@example.com.br');
    });
});
