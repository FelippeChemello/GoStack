import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
    title: string;
    value: number;
    type: 'income' | 'outcome';
    category: string;
}

class CreateTransactionService {
    public async execute({
        title,
        value,
        type,
        category,
    }: Request): Promise<Transaction> {
        const transactionsRepository = getCustomRepository(
            TransactionsRepository,
        );

        const balance = await transactionsRepository.getBalance();
        if (balance.total < value && type === 'outcome') {
            throw new AppError('Insufficient balance');
        }

        const categoryRepository = getRepository(Category);

        let categoryData;
        try {
            categoryData = await categoryRepository.findOneOrFail({
                where: { title: category },
            });
        } catch (err) {
            categoryData = categoryRepository.create({
                title: category,
            });

            await categoryRepository.save(categoryData);
        }

        const transaction = transactionsRepository.create({
            title,
            value: value.toString(),
            type,
            categoryId: categoryData.id,
        });

        await transactionsRepository.save(transaction);

        return transaction;
    }
}

export default CreateTransactionService;
