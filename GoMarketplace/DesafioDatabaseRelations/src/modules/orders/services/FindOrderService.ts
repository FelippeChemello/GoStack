import { inject, injectable } from 'tsyringe';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
    id: string;
}

@injectable()
class FindOrderService {
    constructor(
        @inject('OrdersRepository')
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute({ id }: IRequest): Promise<Order | undefined> {
        return await this.ordersRepository.findById(id);
    }
}

export default FindOrderService;
