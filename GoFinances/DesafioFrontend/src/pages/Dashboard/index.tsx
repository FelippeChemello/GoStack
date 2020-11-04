import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
    id: string;
    title: string;
    value: number;
    formattedValue: string;
    formattedDate: string;
    type: 'income' | 'outcome';
    category: { title: string };
    createdAt: Date;
}

interface Balance {
    income: string;
    outcome: string;
    total: string;
}

const Dashboard: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<Balance>({} as Balance);

    useEffect(() => {
        async function loadTransactions(): Promise<void> {
            const transactions = await api.get('transactions');

            setBalance(transactions.data.balance);
            setTransactions(transactions.data.transactions);
        }

        loadTransactions();
    }, []);

    return (
        <>
            <Header />
            <Container>
                <CardContainer>
                    <Card>
                        <header>
                            <p>Entradas</p>
                            <img src={income} alt="Income" />
                        </header>
                        <h1 data-testid="balance-income">
                            {formatValue(balance.income)}
                        </h1>
                    </Card>
                    <Card>
                        <header>
                            <p>Saídas</p>
                            <img src={outcome} alt="Outcome" />
                        </header>
                        <h1 data-testid="balance-outcome">
                            {formatValue(balance.outcome)}
                        </h1>
                    </Card>
                    <Card total>
                        <header>
                            <p>Total</p>
                            <img src={total} alt="Total" />
                        </header>
                        <h1 data-testid="balance-total">
                            {formatValue(balance.total)}
                        </h1>
                    </Card>
                </CardContainer>

                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map(transaction => {
                                return (
                                    <tr key={transaction.id}>
                                        <td className="title">
                                            {transaction.title}
                                        </td>
                                        <td className={transaction.type}>
                                            {transaction.type === 'outcome' &&
                                                '- '}
                                            {formatValue(transaction.value)}
                                        </td>
                                        <td>{transaction.category.title}</td>
                                        <td>
                                            {formatDate(transaction.createdAt)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </TableContainer>
            </Container>
        </>
    );
};

export default Dashboard;
