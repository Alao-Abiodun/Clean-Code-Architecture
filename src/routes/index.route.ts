import express from 'express';
import productRoute from "./product.route";

const router = express.Router();

productRoute(router);

export default router;
