import { model, Schema } from 'mongoose'
import { ICategory } from './category.model'

export interface IRecipe {
    _id: string
    name: string
    categories: ICategory[]
    caloriesPerPerson?: number
    servings: number
    prepTime?: number // minutes
    cookTime?: number // minutes
    notes?: string
    createdAt: Date
    updatedAt: Date
}

const recipeSchema = new Schema<IRecipe>(
    {
        name: { type: String, required: true },
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        caloriesPerPerson: { type: Number },
        servings: { type: Number, required: true },
        prepTime: { type: Number },
        cookTime: { type: Number },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
)

const Recipe = model<IRecipe>('Recipe', recipeSchema)

export default Recipe