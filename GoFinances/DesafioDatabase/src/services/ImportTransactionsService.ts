import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

import Transaction from '../models/Transaction';
import CreateTransactionService from './CreateTransactionService';
import uploadConfig from '../config/upload';

interface Request {
    fileName: string;
}

interface csvLine {
    0: string;
    1: 'income' | 'outcome';
    2: number;
    3: string;
}

class ImportTransactionsService {
    async execute({ fileName }: Request): Promise<Transaction[]> {
        const readCSVStream = fs.createReadStream(
            path.resolve(uploadConfig.directory, fileName),
        );

        const parseStream = csvParse({
            from_line: 2,
            ltrim: true,
            rtrim: true,
        });

        const parseCSV = readCSVStream.pipe(parseStream);

        const lines = [] as Array<csvLine>;
        parseCSV.on('data', line => lines.push(line));
        await new Promise(resolve => parseCSV.on('end', resolve));

        const transactions = [] as Transaction[];

        for (const line of lines) {
            await new CreateTransactionService().execute({
                title: line[0],
                type: line[1],
                value: line[2],
                category: line[3],
            });
        }

        return transactions;
    }
}

export default ImportTransactionsService;
