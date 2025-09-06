import express, { urlencoded, type Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'
import compression from 'compression'
import routeNotFound from './utils/notFound'
import cookieParser from 'cookie-parser'
import { CORS_ORIGIN, NODE_ENV } from './constants/env'
import errorHandler from './middleware/errorHandler'


const app: Application = express()


app.use(helmet())
app.use(hpp())



app.use(cors({
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}))

app.use(compression())

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(cookieParser())


if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//routes
app.get('/', (req, res) => {
    res.send('API is up and running🚀')
})

app.use(routeNotFound)


app.use(errorHandler)

export default app