import { model, Schema } from 'mongoose'
import { ICategory } from './category.model'

export interface IRecipe {
    _id: string
    categories: ICategory[]
    caloriesPerPerson: number
    servings: number
    time: { // minutes
        prep: number
        cook: number
    }
    notes?: string
    createdAt: Date
    updatedAt: Date
}

const recipeSchema = new Schema<IRecipe>(
    {
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        caloriesPerPerson: { type: Number, required: true },
        servings: { type: Number, required: true },
        time: { type: {
            prep: { type: Number, required: true },
            cook: { type: Number, required: true },
        }, required: true },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
)

const Recipe = model<IRecipe>('Recipe', recipeSchema)

export default Recipe