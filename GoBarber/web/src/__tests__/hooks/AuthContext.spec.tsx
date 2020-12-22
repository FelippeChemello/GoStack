import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from '../../hooks/AuthContext';

describe('Auth Hook', () => {
    it('should be able to SignIn', () => {
        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        result.current.signIn({
            email: 'johndoe@example.com.br',
            password: '123456',
        });

        expect(result.current.user.email).toEqual('johndoe@example.com.br');
    });
});
