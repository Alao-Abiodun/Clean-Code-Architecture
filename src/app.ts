import  express, { Request, Response, NextFunction, Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from './utils/lib/appError';
import { successResponse, errorResponse } from './utils/lib/response';


const app: Application = express();

import routes from './routes/index.route';


// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// mount route
app.use('/ecommerce/v1', routes);

// index route 
app.get('/ecommerce', (req: Request, res: Response) => {
    return successResponse(res, "Welcome to Ecommerce 2024 🚀");
})

// handles 404 routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    return errorResponse(res, `Resource ${req.originalUrl} does not exist 🥲`, StatusCodes.NOT_FOUND)
})

// global error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {

    const message = 
            error.name === 'Error' ? 'Something went wrong!' : error.message;

    const statusCode = 
            error.name === 'Error' ? StatusCodes.INTERNAL_SERVER_ERROR : error.statusCode ?? StatusCodes.BAD_REQUEST;

    return successResponse(res, message, statusCode)
})

export default app;