import { Client } from "pg";
import  pgClient  from "../config/database.config";
import Product from "../entities/product.entities";
import { IProductRepository } from "../interfaces/product.repository";

export default class ProductRepository implements IProductRepository {

    private client: Client;            

    constructor() {
        this.client = pgClient;
    }
    async create({ name, description, price, stock }: Product): Promise<Product> {
        const product = await this.client.query(`
        INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *`, [ name, description, price, stock])

        return product.rows[0]
    }
    async update(id: number, stock: number): Promise<Product> {
        const product = await this.client.query(`UPDATE products SET stock = $1 WHERE id = $2 RETURNING *`, [ id, stock]);

        return product.rows[0]
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        const products = await this.client.query(`SELECT * FROM products OFFSET $1, LIMIT $2`, [offset, limit]);

        return products.rows;
    }

    
}