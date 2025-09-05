import type { Request, Response, NextFunction } from 'express'



const routeNotFound = async(req: Request, res: Response, next: NextFunction):Promise<void> => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    })
}

export default routeNotFound
