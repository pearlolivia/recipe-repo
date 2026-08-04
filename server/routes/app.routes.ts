import { Request, Response, Router } from 'express'
import { ENDPOINTS } from './endpoints'
import Blog from '../models/example.model'

const router = Router()
const ROUTES = ENDPOINTS.app

router.get(ROUTES.example, async (req, res) => {
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

export default router