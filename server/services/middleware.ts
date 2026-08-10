import { Request, Response, NextFuntion } from 'express'
import { getAccessTokenFromHeader, verifyAccessToken } from './authentication.service'
import User from '../models/user.model'

export async function userMW(req: Request, res: Response, next: NextFuntion) {
    const accessToken = await getAccessTokenFromHeader(req)
    if (!accessToken) {
        return res.status(401).json({ error: 'You are unauthorized: No access token found.' })
    }

    const { error, payload } = await verifyAccessToken(accessToken)
    if (!!error || !payload) {
        return res.status(400).json({ error })
    }

    const loggedInUser = await User.findById(payload.uuid)
    if (!loggedInUser) {
        return res.status(403).json({ error: 'Could not find logged in user' })
    }

    res.locals.loggedInUser = loggedInUser

    next()

}

/**
 * AuthProvider - cache user data with session expiry (local storage)
 * if session expired, revoke access token from DB & clear cache
 * */