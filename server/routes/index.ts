import { Router } from 'express'

import appRouter from './app.routes'
import authRouter from './auth.routes'
import { userMW } from '../services/middleware'

const mainRouter = Router()

mainRouter.use('/app', userMW, appRouter)
mainRouter.use('/auth', authRouter)

export default mainRouter