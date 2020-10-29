import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import uploadConfig from '../config/upload';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    return response.json({
        transactions: await transactionsRepository.find(),
        balance: await transactionsRepository.getBalance(),
    });
});

transactionsRouter.post('/', async (request, response) => {
    const { title, value, type, category } = request.body;

    const transaction = await new CreateTransactionService().execute({
        title,
        value,
        type,
        category,
    });

    return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    await new DeleteTransactionService().execute({ id });

    return response.status(204).send();
});

transactionsRouter.post(
    '/import',
    upload.single('file'),
    async (request, response) => {
        console.warn(request.file.filename);

        const transactions = await new ImportTransactionsService().execute({
            fileName: request.file.filename,
        });

        return response.json(transactions);
    },
);

export default transactionsRouter;
