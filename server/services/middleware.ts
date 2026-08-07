import { Request, Response, NextFuntion } from 'express'
import { getAccessTokenFromHeader } from './authentication.service'

export async function userMW(req: Request, res: Response, next: NextFuntion) {
    const accessToken = getAccessTokenFromHeader(req)
    if (!accessToken) {
        return res.status(401).json({ error: 'You are unauthorized: No access token found.' })
    }

    // set res.locals.sessionUser

    next()                                                                                                                                                                                                                                                                                                                                                           )

}

/**
 * AuthProvider - cache user data with session expiry (local storage)
 * if session expired, revoke access token from DB & clear cache
 * */