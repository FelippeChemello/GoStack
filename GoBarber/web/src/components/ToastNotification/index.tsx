import React from 'react';

import { ToastMessage } from '../../context/ToastContext';

import { Container } from './styles';
import Toast from './Toast';

interface ToastNotificationProps {
    messages: ToastMessage[];
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ messages }) => {
    return (
        <Container>
            {messages.map(message => (
                <Toast key={message.id} message={message} />
            ))}
        </Container>
    );
};

export default ToastNotification;
