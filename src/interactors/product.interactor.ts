import Product from "../entities/product.entities";
import { IProduct } from "../interfaces/product.interface";
import { IProductRepository } from "../interfaces/product.repository";

export class ProductInteractor implements IProduct {

    private repository: IProductRepository

    constructor(repository: IProductRepository) {
        this.repository = repository;
    }

    async createProduct(input: any): Promise<Product> {
        return await this.repository.create(input);
    }
    async updateStock(id: number, stock: number): Promise<any> {
        return await this.repository.update(id, stock);
    }
    async getProduct(limit: number, offset: number): Promise<Product[]> {
        return await this.repository.find(limit, offset);
    }

}