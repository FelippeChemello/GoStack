import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface ResponseDTO {
    transactions: Transaction[];
    balance: Balance;
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute(): ResponseDTO {
        const transactionsAndBalance: ResponseDTO = {
            transactions: this.transactionsRepository.all(),
            balance: this.transactionsRepository.getBalance(),
        };

        return transactionsAndBalance;
    }
}

export default CreateTransactionService;
