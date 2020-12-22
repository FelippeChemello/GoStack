import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
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

    it('should recover data from localStorage when AuthProvider Inits', async () => {
        const authData = {
            user: {
                id: 'userId',
                name: 'John Doe',
                email: 'johndoe@example.com.br',
            },
            token: 'token-123',
        };

        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
            switch (key) {
                case '@GoBarber:token':
                    return authData.token;
                case '@GoBarber:user':
                    return JSON.stringify(authData.user);
                default:
                    return null;
            }
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        expect(result.current.user.email).toEqual('johndoe@example.com.br');
    });

    it('should delete data from localStorage when SignOut', async () => {
        const authData = {
            user: {
                id: 'userId',
                name: 'John Doe',
                email: 'johndoe@example.com.br',
            },
            token: 'token-123',
        };

        jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
            switch (key) {
                case '@GoBarber:token':
                    return authData.token;
                case '@GoBarber:user':
                    return JSON.stringify(authData.user);
                default:
                    return null;
            }
        });

        const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        act(() => {
            result.current.signOut();
        });

        expect(result.current.user).toBeUndefined();
        expect(removeItemSpy).toHaveBeenCalledTimes(2);
    });

    it('should update user data', async () => {
        const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        const user = {
            id: 'userId',
            name: 'Jane Doe',
            email: 'janedoe@example.com.br',
            avatarUrl: 'image.jpg',
            avatar: 'image.jpg',
        };

        act(() => {
            result.current.updateUser(user);
        });

        expect(setItemSpy).toHaveBeenCalledWith(
            '@GoBarber:user',
            JSON.stringify(user),
        );
        expect(result.current.user).toEqual(user);
    });
});
