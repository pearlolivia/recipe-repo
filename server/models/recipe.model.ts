import { model, Schema } from 'mongoose'

export interface IRecipe {
    _id: string
    name: string
    tags: string[]
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
        tags: [{ type: String }],
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