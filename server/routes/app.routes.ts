import { Request, Response, Router } from 'express'
import { ENDPOINTS } from './endpoints'
import Blog from '../models/example.model'
import BaseRouter from './baseRoute'
import Recipe from '../models/recipe.model'
import Category from '../models/category.model'

const router = Router()
const ROUTES = ENDPOINTS.app

router.get(ROUTES.example, async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find()
        if (!blogs) {
            res.status(400).json({ message: 'Unable to find blogs' })
            return
        }
        res.status(200).json(blogs)
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

BaseRouter(router, {
    route: ROUTES.recipe,
    model: Recipe,
    populate: ['categories'],
})

BaseRouter(router, {
    route: ROUTES.category,
    model: Category
})

export default router