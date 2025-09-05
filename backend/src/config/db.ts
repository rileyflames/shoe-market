import mongoose from 'mongoose'
import { DB_NAME, MONGO_URI } from "../constants/env.js";
import logger from '../utils/logger.js';


export const connectDB = async ():Promise<void> => {

    const maxRetries: number = 5;
    let attempt: number = 0;
    let delay: number = 1000;

    while (attempt < maxRetries) {
        try{
            await mongoose.connect(MONGO_URI, {
                dbName: DB_NAME
            })
            logger.info(`✅ Connected to MongoDB.....`)

        }catch(error) {
            attempt++;
            logger.error(`MongoDB connection error ( Attempt: ${attempt}) `, error)
        }

        if(attempt < maxRetries) {
            logger.info(`Retrying MongoDB connection in ${delay / 1000} seconds....`)
            await new Promise((res)=> setTimeout(res, delay))
            delay *=2
        }else {
            logger.error(`Failed to connect to MongoDB after ${maxRetries} attempts. Now Exiting`)
            process.exit(1)
        }
    }
}


let isShuttingDown: boolean = false;

export const gracefulShutdown = async (): Promise<void> => {
    if(isShuttingDown) return;
    isShuttingDown = true

    try{
        logger.info('Received kill signal, shutting down gracefully...')
        await mongoose.connection.close()
        logger.info('MongoDB connection closed.')
        process.exit(0)
    }catch(error: unknown) {
        logger.error('Error during graceful shutdown', error)
        process.exit(1)
    }
}