import { model, Schema } from 'mongoose'

export interface IStep {
    _id: string
    instruction: string
    ingredients: string[]
    order: number
    createdAt: Date
    updatedAt: Date
}

const stepSchema = new Schema<IStep>(
    {
        instruction: { type: String, required: true },
        ingredients: [{ type: String, required: true }],
        order: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    }
)

const Step = model<IStep>('Step', stepSchema)

export default Step