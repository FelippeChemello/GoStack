import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
    id: string;
}

class DeleteTransactionService {
    public async execute({ id }: Request): Promise<void> {
        const transactionsRepository = getCustomRepository(
            TransactionsRepository,
        );

        await transactionsRepository.delete({ id });
    }
}

export default DeleteTransactionService;
