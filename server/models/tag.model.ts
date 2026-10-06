import { model, Schema } from 'mongoose'

export interface ITag {
    _id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

const TagSchema = new Schema<ITag>(
    {
        name: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const Tag = model<ITag>('Tag', TagSchema)

export default Tag