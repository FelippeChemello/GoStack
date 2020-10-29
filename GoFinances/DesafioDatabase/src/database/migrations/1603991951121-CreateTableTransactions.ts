import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTransactions1603991951121
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'value',
                        type: 'decimal',
                        scale: 10,
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                    },
                    {
                        name: 'categoryId',
                        type: 'varchar',
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('transactions');
    }
}
