import { model, Schema } from 'mongoose'

type IType = 'protein' | 'carb' | 'vegetable' | 'fruit' | 'fats' | 'dairy'

export interface IIngredient {
    _id: string
    item: string
    type: IType
    createdAt: Date
    updatedAt: Date
}

const ingredientSchema = new Schema<IIngredient>(
    {
        item: { type: String, required: true },
        type: { type: String, enum: ['protein', 'carb', 'vegetable', 'fruit', 'fats', 'dairy'], required: true },
    },
    {
        timestamps: true,
    }
)

const Ingredient = model<IIngredient>('Ingredient', ingredientSchema)

export default Ingredient