import React from 'react';
import {
    Redirect,
    Route as ReactRouterDomRouteComponent,
    RouteProps as ReactRouterDomRouteProps,
} from 'react-router-dom';

// import { Container } from './styles';

import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactRouterDomRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Routes: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();

    return (
        <ReactRouterDomRouteComponent
            {...rest}
            render={({ location }) => {
                const isSigned = Boolean(user);

                return isPrivate === isSigned ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
};

// Lógica do return presente dentro do render
// Se rota é privada e está logado -> renderiza a rota
// Se a rota não é privada e não está logado -> renderiza a rota
// Se a rota é privada e não está logado -> renderiza o SignIn
// Se a rota não é privada e está logado -> renderiza o dashboard (Pois já fez o login antes, não precisa fazer dnv)

export default Routes;
