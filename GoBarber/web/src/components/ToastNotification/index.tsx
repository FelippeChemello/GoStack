import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/ToastContext';

import { Container } from './styles';
import Toast from './Toast';

interface ToastNotificationProps {
    messages: ToastMessage[];
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 },
        },
    );

    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props }) => (
                <Toast key={key} message={item} style={props} />
            ))}
        </Container>
    );
};

export default ToastNotification;
