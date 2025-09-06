import logger from "../utils/logger";
import { NODE_ENV } from "../constants/env";
import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import AppError from "../utils/AppError";


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
    
    const statusCode = (err as any).statusCode || 500
    const status = (err as any).status || 'error'


    // log the error
    logger.error({
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error? err.stack : undefined,
        path: req.originalUrl,
        method: req.method
    })

    // Zod validation errors
    if( err instanceof ZodError) {
        return res.status(400).json({
            status: 'fail',
            errors: err.issues.map(e => ({
                path: e.path,
                message: e.message
            }))
        })
    }

    // In development: show full details
    if(NODE_ENV === 'development') {
        return res.status(statusCode).json({
            status,
            message: err instanceof Error ? err.message : 'Unknown error',
            stack: err instanceof Error  ? err.stack : undefined,
            error: err
        })
    }

    // Operational, trusted errors
    if(err instanceof AppError && err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    //Programming or unknown error
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong'
    })


    
}

export default errorHandler