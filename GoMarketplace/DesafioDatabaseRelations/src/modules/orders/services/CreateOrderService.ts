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
            throw new AppError('Products not found', 400);
        }

        // const productsId = findProducts.map(product => product.id);

        // const inexistentProducts = products.filter(
        //     product => !productsId.includes(product.id),
        // );

        // if (inexistentProducts.length) {
        //     throw new AppError(
        //         `Could not find product ${JSON.stringify(inexistentProducts)}`,
        //     );
        // }

        // const findProductsWithoutStock = products.filter(
        //     product =>
        //         findProducts.filter(p => p.id === product.id)[0].quantity <
        //         product.quantity,
        // );

        // if (findProductsWithoutStock.length) {
        //     throw new AppError('Product is out of stock', 400);
        // }

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
