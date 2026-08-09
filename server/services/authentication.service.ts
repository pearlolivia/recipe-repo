import { Request, Response } from 'express'
import { IUser } from '../models/user.model'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
    throw 'JWT secret missing.'
}

const ACCESS_TOKEN_LIFETIME = 1000 * 60 * 60 * 24 // one day

// will be set on every API call from DB
export async function getAccessTokenFromHeader(req: Request) {
    const header = req?.headers?.authorization
    
    if (!header || typeof header !== 'string') return

    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) return

    return token
}

type AccessTokenPayload = jwt.JwtPayload & { uuid: string }

// encode access token
export async function encodeAccessToken(user: IUser, now: Date): Promise<{ error?: string; token?: string }> {
    const payload: AccessTokenPayload = {
        uuid: user._id,
        iat: now.valueOf(),
        exp: now.valueOf() + ACCESS_TOKEN_LIFETIME,
    }

    return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, {}, (error, token) => {
            if (error || !token) {
                reject({ error: (error ?? 'Error encoding token'), token: null})
                return
            }
            resolve({ token })
        })
    })
}

// decode access token
export async function decodeAccessToken(token: string): Promise<{ error?: string; payload: AccessTokenPayload }>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, {}, (error, decoded) => {
            if (error || !decoded) {
                reject({ error: (error ?? 'Error encoding token'), payload: null})
                return
            }
            const payload = decoded as AccessTokenPayload
            resolve({ payload })
        })
    })
}

// create access token for logged in user
export async function createUserToken(user: IUser) {
    const now = new Date()
    const { error, token } = await encodeAccessToken(user, now)
    if (error || !token) {
        return [null, new Error('Authentication failed, please try again')]
    }

    return [
        {
            accessToken: token,
            tokenType: 'Bearer',
            expiresAt: now.valueOf() + ACCESS_TOKEN_LIFETIME,
        },
        null,
    ]
}

// verify token for user
export async function verifyAccessToken(accessToken: string) {
    const { error, payload } = await decodeAccessToken(accessToken)
        .then((x) => x)
        .catch((x: [Error, null]) => x)
    if (error || !payload || typeof payload !== 'object') {
        return {error: error ?? 'Invalid token', payload: null}
    }

    const now = new Date()

    if (!payload?.exp || payload.exp < now.valueOf()) {
        return { error: error ?? 'Expired token', payload }
    }

    return { error: null, payload }
}