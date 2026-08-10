import { Router } from 'express'

import appRouter from './app.routes'
import authRouter from './auth.routes'

const mainRouter = Router()

mainRouter.use('/app', appRouter)
mainRouter.use('/auth', authRouter)

export default mainRouter