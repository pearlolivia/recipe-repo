import { model, Schema } from 'mongoose'

export interface IBlog {
    _id: string
    title: string
    snippet: string
    body: string
    createdAt: Date
    updatedAt: Date
}

const blogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: true },
        snippet: { type: String },
        body: { type: String },
    },
    {
        timestamps: true,
    }
)

const Blog = model<IBlog>('Blog', blogSchema)

export default Blog