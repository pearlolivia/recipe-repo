import { model, Schema } from 'mongoose'

export interface IUser {
    _id: string
    username: string
    password: string // hashed
    firstName: string
    lastLoginAt: Date
    createdAt: Date
    updatedAt: Date
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastLoginAt: { type: Date },
}, {
    timestamps: true
})

const removePassword = (_, object) => {
    delete object.password
    return object
}

userSchema.set('toObject', { transform: removePassword })

const User = model<IUser>('User', userSchema)
export default User