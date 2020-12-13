import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
    id: string;
}

class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async create({
        name,
        price,
        quantity,
    }: ICreateProductDTO): Promise<Product> {
        const product = this.ormRepository.create({
            name,
            price,
            quantity,
        });

        await this.ormRepository.save(product);

        return product;
    }

    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({ where: { name } });

        return product;
    }

    public async findAllById(products: IFindProducts[]): Promise<Product[]> {
        const findProducts = await this.ormRepository.find({
            where: { id: In(products.map(product => product.id)) },
        });

        return findProducts;
    }

    public async updateQuantity(
        products: IUpdateProductsQuantityDTO[],
    ): Promise<Product[]> {
        const productsThatNeedUpdatePromise = products.map(product =>
            this.ormRepository.findOne(product.id),
        );

        const productsThatNeedUpdate = await Promise.all(
            productsThatNeedUpdatePromise,
        );

        const updatedProductsPromise = productsThatNeedUpdate.map(product => {
            if (!product) {
                console.error("Error at updatind product's quantity");
                throw new AppError("Error at updatind product's quantity");
            }

            const newQuantity = products.find(prod => prod.id === product.id)
                ?.quantity;

            if (!newQuantity) {
                throw new AppError(
                    'New quantity not found for requested product',
                );
            }

            product.quantity = newQuantity;

            return this.ormRepository.save(product);
        });

        const updatedProducts = await Promise.all(updatedProductsPromise);

        return updatedProducts;
    }
}

export default ProductsRepository;
