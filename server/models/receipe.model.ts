import { model, Schema } from 'mongoose'
import { IIngredient } from './ingredient.model'
import { ICategory } from './category.model'
import { IStep } from './step.model'

type IngredientQuantity = IIngredient & { quantity: string }

export interface IRecipe {
    _id: string
    ingredients: IngredientQuantity[]
    categories: ICategory[]
    steps: IStep[]
    caloriesPerPerson: number
    servings: number
    notes?: string
    createdAt: Date
    updatedAt: Date
}

const recipeSchema = new Schema<IRecipe>(
    {
        ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient', required: true }],
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
        steps: [{ type: Schema.Types.ObjectId, ref: 'Step', required: true }],
        caloriesPerPerson: { type: Number, required: true },
        servings: { type: Number, required: true },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
)

const Recipe = model<IRecipe>('Recipe', recipeSchema)

export default Recipe