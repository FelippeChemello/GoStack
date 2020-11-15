import React, { useEffect } from 'react';
import {
    FiAlertCircle,
    FiCheckCircle,
    FiInfo,
    FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';

import { useToast, ToastMessage } from '../../../context/ToastContext';

interface ToastProps {
    message: ToastMessage;
    style: object;
}

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
    const { removeToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id);
        }, 3000);

        return () => {
            clearTimeout(timer);
        }; // React permite que, ao retornar uma função no useEffect, esta função seja executada quando o componente for rmeovido
    }, [message.id, removeToast]);

    return (
        <Container
            hasDescription={Boolean(message.description)}
            type={message.type}
            style={style} // React permite utilização de estilos inline, como seria no estilo de objetos (como no React-Native), podemos jogar o estilo recebido das animações diretamente para essa propriedade
        >
            {icons[message.type || 'info']}

            <div>
                <strong>{message.title}</strong>
                {message.description && <p>{message.description}</p>}
            </div>

            <button type="button" onClick={() => removeToast(message.id)}>
                <FiXCircle size={18} />
            </button>
        </Container>
    );
};

export default Toast;
