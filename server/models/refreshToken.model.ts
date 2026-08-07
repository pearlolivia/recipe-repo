import { model, Schema } from 'mongoose'
import { IUser } from './user.model'

export const TOKEN_LIFETIME = 604800 // one week

export interface IRefreshToken {
    token: string // hashed
    user: IUser
    expiresAt: Date
    revoked?: boolean
    createdAt: Date
}

const tokenSchema = new Schema<IRefreshToken>({
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiresAt: { type: Date, required: true },
    revoked: { type: Date, default: false },
})

const RefreshToken = model<IRefreshToken>('RefreshToken', tokenSchema)
export default RefreshToken