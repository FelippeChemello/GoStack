import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

interface CreateTransactionDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class TransactionsRepository {
    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {
        let incomes = 0;
        this.transactions.forEach(transacao => {
            if (transacao.type === 'income') incomes += transacao.value;
        });

        let outcomes = 0;
        this.transactions.forEach(transacao => {
            if (transacao.type === 'outcome') outcomes += transacao.value;
        });

        const balance: Balance = {
            income: incomes,
            outcome: outcomes,
            total: incomes - outcomes,
        };

        return balance;
    }

    public create({ title, value, type }: CreateTransactionDTO): Transaction {
        const transaction = new Transaction({ title, value, type });

        this.transactions.push(transaction);

        return transaction;
    }
}

export default TransactionsRepository;
