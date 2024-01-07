import Product from "../entities/product.entities";

export interface IProduct {
    createProduct(input: any): any;
    updateStock(id: number, stock: number): Promise<any>
    getProduct(limit: number, offset: number): Promise<Product[]>
}