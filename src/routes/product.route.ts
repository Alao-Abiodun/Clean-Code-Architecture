import express, { Router } from 'express';
import { Product } from '../controllers/product.controller';
import { ProductInteractor } from '../interactors/product.interactor';
import ProductRepository from '../repositories/product.repository';
const repository = new ProductRepository();
const interactor = new ProductInteractor(repository);

const product = new Product(interactor);

export default (router: Router) => {
    router.post('/product' , product.onCreateProduct);
    router.put('/product/stock/:id', product.onUpdateStock);
    router.get('/products', product.onGetProducts);
}