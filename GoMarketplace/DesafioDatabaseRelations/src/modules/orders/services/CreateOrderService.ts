import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

@injectable()
class CreateOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const customer = await this.customersRepository.findById(customer_id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        const findProducts = await this.productsRepository.findAllById(
            products,
        );

        if (!findProducts) {
            throw new AppError('Products not found');
        }

        products.map(product => {
            const p = findProducts.find(p => p.id === product.id);

            if (!p) {
                throw new AppError(`Product ${product.id} not found`);
            }

            if (p.quantity < product.quantity) {
                throw new AppError(`Product ${p.name} is out of stock`);
            }
        });

        const serializedProducts = products.map(product => {
            return {
                product_id: product.id,
                quantity: product.quantity,
                price:
                    findProducts.filter(p => p.id === product.id)[0]?.price ||
                    999,
            };
        });

        const order = await this.ordersRepository.create({
            customer,
            products: serializedProducts,
        });

        const newProductsQuantity = products.map(product => {
            return {
                id: product.id,
                quantity:
                    findProducts.filter(p => p.id == product.id)[0].quantity -
                    product.quantity,
            };
        });

        await this.productsRepository.updateQuantity(newProductsQuantity);

        return order;
    }
}

export default CreateOrderService;
