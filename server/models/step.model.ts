import { model, Schema } from 'mongoose'
import { IRecipe } from './recipe.model'

export interface IStep {
    _id: string
    recipe: IRecipe
    instruction: string
    ingredients: string[]
    order: number
    createdAt: Date
    updatedAt: Date
}

const stepSchema = new Schema<IStep>(
    {
        recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
        instruction: { type: String, required: true },
        ingredients: [{ type: String }],
        order: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    }
)

const Step = model<IStep>('Step', stepSchema)

export default Step