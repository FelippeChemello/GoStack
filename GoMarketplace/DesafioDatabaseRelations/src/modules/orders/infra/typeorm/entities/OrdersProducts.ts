import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders_products')
class OrdersProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @ManyToOne(() => Product, order => order.order_products)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    product_id: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default OrdersProducts;
