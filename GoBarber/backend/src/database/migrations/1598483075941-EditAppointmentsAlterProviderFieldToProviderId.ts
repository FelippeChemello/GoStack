import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class EditAppointmentsAlterProviderFieldToProviderId1598483075941
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'providerId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.query(
            'ALTER TABLE appointments ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4())',
        );

        await queryRunner.query(
            'ALTER TABLE users ALTER COLUMN id SET DATA TYPE UUID USING (uuid_generate_v4())',
        );

        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                name: 'AppointmentProvider',
                columnNames: ['providerId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.query(
            'ALTER TABLE appointments ALTER COLUMN id TYPE varchar',
        );

        await queryRunner.query(
            'ALTER TABLE users ALTER COLUMN id TYPE varchar',
        );

        await queryRunner.dropColumn('appointments', 'providerId');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider',
                type: 'varchar',
                isNullable: false,
            }),
        );
    }
}
