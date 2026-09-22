import { model, Schema } from 'mongoose'
import { IIngredient } from './ingredient.model'
import { IRecipe } from './recipe.model'

export interface IRecipeIngredient {
    _id: string
    recipe: IRecipe
    ingredient: IIngredient
    quantity: string
    prep?: string
    createdAt: Date
    updatedAt: Date
}

const rISchema = new Schema<IRecipeIngredient>(
    {
        recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
        ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        quantity: { type: String, required: true },
        prep: { type: String },
    },
    {
        timestamps: true,
    }
)

const RecipeIngredient = model<IRecipeIngredient>('RecipeIngredient', rISchema)

export default RecipeIngredient