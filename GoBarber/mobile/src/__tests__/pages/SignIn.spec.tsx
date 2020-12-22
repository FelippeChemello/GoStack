import React from 'react';
import { render } from 'react-native-testing-library';

import SignIn from '../../pages/SignIn';

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: jest.fn(),
    };
});

describe('SignIn Page', () => {
    it('should contains logo image and email/password inputs', () => {
        const { getByPlaceholder, getByTestId } = render(<SignIn />);

        expect(getByTestId('logo-image')).toBeTruthy();
        expect(getByPlaceholder('E-mail')).toBeTruthy();
        expect(getByPlaceholder('Senha')).toBeTruthy();
    });
});
