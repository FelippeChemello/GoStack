import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';

import Category from './Category';

@Entity('transactions')
class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    type: 'income' | 'outcome';

    @Column()
    value: string;

    @ManyToOne(() => Category, category => category.transaction, {
        eager: true,
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Transaction;
