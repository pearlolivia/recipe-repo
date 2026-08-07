import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { ENDPOINTS } from './endpoints'
import User from '../models/user.model'

const router = new Router()
const ROUTES = ENDPOINTS.auth

const SALT_ROUNDS = 10

router.post(ROUTES.register, async (req: Request, res: Response) => {
    try {
        const { username, firstName, password } = req.body

        if (!username || !password || !firstName) {
            return res.status(400).json({ error: 'Please provide your name, a username and password to create an account.' })
        }

        const existingUser = await User.findOne({username})
        if (existingUser) {
            return res.status(400).json({ error: 'An account already exists with this username. Please login or try another.' })
        }

        const hashedPass = bcrypt.hash(password, SALT_ROUNDS)

        const newUser = await new User({
            username,
            password: hashedPass,
            lastLoginAt: new Date()
        }).save()

        return res.status(201).json({ message: 'Registration successful!' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `Error creating your account: ${error ?? 'Something went wrong'}`})
    }
})

export default router

