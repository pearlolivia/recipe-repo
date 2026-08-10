import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { ENDPOINTS } from './endpoints'
import User from '../models/user.model'
import { createUserToken, getAccessTokenFromHeader, verifyAccessToken } from '../services/authentication.service'

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

        const hashedPass = await bcrypt.hash(password, SALT_ROUNDS)

        const newUser = await new User({
            firstName,
            username,
            password: hashedPass,
            lastLoginAt: new Date()
        }).save()

        console.log('newUser: ', newUser)

        // create access token
        const { token, error } = await createUserToken(newUser)
        console.log('token: ', token)
        if (!!error || !token) {
            return res.status(500).json({ error: error ?? 'Failed to generate access token.' })
        }

        // const hashedToken = await bcrypt.hash(JSON.stringify(token), SALT_ROUNDS)

        return res.status(201).json({
            message: 'Registration successful!',
            accessToken: token,
            user: {
                ...newUser,
                password: undefined // do not share password in localstorage
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: `Error creating your account: ${error ?? 'Something went wrong'}`})
    }
})

router.get(ROUTES.check, async (req: Request, res: Response) => {
    try {
        const accessToken = await getAccessTokenFromHeader(req)
        if (!accessToken) {
            return res.status(400).json({ error: 'Could not find access token' })
        }

        const { error, payload } = await verifyAccessToken(accessToken)
        if (!!error || !payload) {
            return res.status(400).json({ error })
        }

        const you = await User.findById(payload.uuid).select('-password').lean()

        if (!you) {
            return res.status(400).json({ error: 'Could not find user' })
        }
        return res.status(200).json(you)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error ?? 'Could not check user details.' })
    }
})

export default router

