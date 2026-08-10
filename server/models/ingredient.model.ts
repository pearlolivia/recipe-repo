import { model, Schema } from 'mongoose'
import { IRecipe } from './recipe.model'

type IType = 'protein' | 'carb' | 'vegetable' | 'fruit' | 'fats' | 'dairy'

export interface IIngredient {
    _id: string
    recipe: IRecipe
    item: string
    type: IType
    quantity: string
    createdAt: Date
    updatedAt: Date
}

const ingredientSchema = new Schema<IIngredient>(
    {
        recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
        item: { type: String, required: true },
        type: { type: String, enum: ['protein', 'carb', 'vegetable', 'fruit', 'fats', 'dairy'], required: true },
        quantity: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const Ingredient = model<IIngredient>('Ingredient', ingredientSchema)

export default Ingredient