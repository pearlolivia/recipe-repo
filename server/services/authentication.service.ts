import { Request, Response } from 'express'

// will be set on every API call
export async function getAccessTokenFromHeader(req: Request) {
    const header = req?.headers?.authorization
    
    if (!header || typeof header !== 'string') return

    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) return

    return token
}