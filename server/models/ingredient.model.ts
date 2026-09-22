import { model, Schema } from 'mongoose'

export enum IngredientType {
    Protein = 'protein',
    Carbohydrate = 'carb',
    Vegetable = 'vegetable',
    Fruit = 'fruit',
    Fats = 'fats',
    Dairy = 'dairy'
}

export interface IIngredient {
    _id: string
    name: string
    type: IngredientType
    description?: string
    createdAt: Date
    updatedAt: Date
}

const ingredientSchema = new Schema<IIngredient>(
    {
        name: { type: String, required: true },
        type: { type: String, enum: ['protein', 'carb', 'vegetable', 'fruit', 'fats', 'dairy'], required: true },
        description: { type: String },
    },
    {
        timestamps: true,
    }
)

const Ingredient = model<IIngredient>('Ingredient', ingredientSchema)

export default Ingredient