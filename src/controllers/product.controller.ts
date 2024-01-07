import { Request, Response, NextFunction } from "express";
import { IProduct } from "../interfaces/product.interface";
import { successResponse } from "../utils/lib/response";

export class Product {

    private interactor: IProduct

    constructor(interactor: IProduct) {
        this.interactor = interactor
    }

    async onCreateProduct(req: Request, res: Response, next: NextFunction){

        try {
            const body = req.body;
 
            const data = this.interactor.createProduct(body);

            return successResponse(res, "Product Crreated Successfully", {
                data
            })
        } catch (error) {
            next(error);
        }
    }

    async onUpdateStock(req: Request, res: Response, next: NextFunction){

        try {
            const { id } = req.params;
            const productStock = req.body;

            this.interactor.updateStock(Number(id), productStock);

            return successResponse(res, "Stock updated successfully"); 
        } catch (error) {
            next(error)
        }
    }
    async onGetProducts(req: Request, res: Response, next: NextFunction){

        try {
            const offset = req.params.offset || 0;
            const limit = req.params.limit || 10;

            const data = this.interactor.getProduct(Number(limit), Number(offset));

            return successResponse(res, "Product retrieved successfully", {
                data
            });
        } catch (error) {
            next(error);
        }
    }
}