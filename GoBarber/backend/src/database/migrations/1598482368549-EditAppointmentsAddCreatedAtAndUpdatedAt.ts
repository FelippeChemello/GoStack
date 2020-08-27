import { MigrationInterface, QueryRunner } from 'typeorm';

export default class EditAppointmentsAddCreatedAtAndUpdatedAt1598482368549
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE appointments ADD COLUMN "createdAt" timestamp NOT NULL DEFAULT now()',
        );

        await queryRunner.query(
            'ALTER TABLE appointments ADD COLUMN "updatedAt" timestamp NOT NULL DEFAULT now()',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE appointments DROP COLUMN "createdAt", DROP COLUMN "updatedAt"',
        );
    }
}
