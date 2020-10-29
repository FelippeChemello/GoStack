import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
    income: number;
    outcome: number;
    total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
    public async getBalance(): Promise<Balance> {
        const incomesTransactions = await this.find({
            where: { type: 'income' },
        });
        let incomes = 0;
        incomesTransactions.forEach(transacao => {
            incomes = incomes + parseInt(transacao.value);
        });

        const outcomesTransactions = await this.find({
            where: { type: 'outcome' },
        });
        let outcomes = 0;
        outcomesTransactions.forEach(transacao => {
            outcomes = outcomes + parseInt(transacao.value);
        });

        const balance: Balance = {
            income: incomes,
            outcome: outcomes,
            total: incomes - outcomes,
        };

        return balance;
    }
}

export default TransactionsRepository;
