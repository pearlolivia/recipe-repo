import { Router } from 'express'

import appRouter from './app.routes'

const mainRouter = Router()

mainRouter.use('/app', appRouter)

export default mainRouter