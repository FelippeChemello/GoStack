import React from 'react';
import { render } from '@testing-library/react';

import SignIn from '../../pages/SignIn';

// Quando este modulo for importado retornará o que estiver dentro do return
// Neste caso criamos o useHistory e dissemos que ele é uma função vazia através de 'jest.fn'
jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn(),
        Link: ({ children }: { children: React.ReactNode }) => children,
    };
});

describe('SignIn Page', () => {
    it('should be able to sign in', () => {
        const { debug } = render(<SignIn />);

        debug();
    });
});
