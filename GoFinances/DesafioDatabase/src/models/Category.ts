import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import Transaction from './Transaction';

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transaction: Transaction;
}

export default Category;
