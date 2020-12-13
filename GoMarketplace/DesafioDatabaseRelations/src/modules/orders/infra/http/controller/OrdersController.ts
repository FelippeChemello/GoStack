import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const orderId = request.params.id;

        const order = await container
            .resolve(FindOrderService)
            .execute({ id: orderId });

        return response.json(order);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { customer_id, products } = request.body;

        const order = await container.resolve(CreateOrderService).execute({
            customer_id,
            products,
        });

        return response.json(order);
    }
}
