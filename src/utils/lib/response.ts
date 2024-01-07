import { Response } from "express"
import { getReasonPhrase } from "http-status-codes"

export interface ISuccessResponse {
    success: true,
    message: string,
    payload: {
        [key: string]: any
    }
}

export interface IErrorResponse {
    success: false,
    error: {
        type: string,
        code: number,
        message: string
    }
}

export const successResponse = (
    res: Response,
    message: string,
    payload?: any,
    statusCode: number = 200
): Response<ISuccessResponse> => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload: { ...payload },
    })
}

export const errorResponse = (
    res: Response,
    message: string,
    statusCode: number 
): Response<IErrorResponse> => {
    const reason = getReasonPhrase(statusCode)
    return res.status(statusCode).json({
        success: false,
        error: {
            type: reason,
            code: statusCode,
            message: message
        }
    })
}