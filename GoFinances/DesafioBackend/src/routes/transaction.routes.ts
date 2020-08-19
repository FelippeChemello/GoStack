import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsAndFinalBalanceService from '../services/GetTransactionsAndFinalBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
    try {
        return response.json(
            new GetTransactionsAndFinalBalanceService(
                transactionsRepository,
            ).execute(),
        );
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

transactionRouter.post('/', (request, response) => {
    try {
        const { title, value, type } = request.body;

        const transaction = new CreateTransactionService(
            transactionsRepository,
        ).execute({ title, value, type });

        return response.json(transaction);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default transactionRouter;
