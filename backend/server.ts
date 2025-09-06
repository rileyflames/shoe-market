import 'dotenv/config'

import http from 'http'
import app from './src/app'
import { connectDB, gracefulShutdown } from './src/config/db'
import logger from './src/utils/logger'
import { CORS_ORIGIN, NODE_ENV, PORT } from './src/constants/env'


const server = http.createServer(app)

//start HTTP server

const startServer = async ():Promise<void> => {
    try{
        await connectDB()

        server.listen(PORT, ()=>{
            logger.info(`Server running on ${CORS_ORIGIN} [${NODE_ENV}]`)
        })

        // graceful shutdown 
        const shutdown = async(signal: string): Promise<void> => {
            await gracefulShutdown()
            server.close(()=> {
                logger.info('HTTP Server closed.')
                process.exit(0)
            })
        }

        // catch OS termination signals
        process.on('SIGINT', ()=> shutdown('SIGINT'))
        process.on('SIGTERM', ()=> shutdown('SIGTERM'))

        // UNHANDLED PROMISE REJECTION
        process.on('unhandledRejection', (err:unknown)=> {
            logger.error('! Unhandled Promise Rejection', err)
            shutdown('unhandledRejection')
        })

        // HANDLE UNCAUGHT EXCEPTIONS
        process.on('uncaughtException', (err:unknown)=> {
            logger.error('Uncaught Exception', err)
            shutdown('uncaughtException')
        })
    }catch (error) {
        logger.error('Server failed to start', error)
        process.exit(1)
    }
}


startServer()
