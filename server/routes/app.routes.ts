import { Request, Response, Router } from 'express'
import { ENDPOINTS } from './endpoints'
import Blog from '../models/example.model'
import BaseRouter, { pick, return500Error } from './baseRoute'
import Recipe from '../models/recipe.model'
import Category from '../models/category.model'
import Ingredient, { IIngredient } from '../models/ingredient.model'
import RecipeIngredient, { IRecipeIngredient } from '../models/recipeIngredient.model'
import Step, { IStep } from '../models/step.model'

const router = Router()
const ROUTES = ENDPOINTS.app

router.get(ROUTES.example, async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find()
        if (!blogs) {
            res.status(400).json({ message: 'Unable to find blogs' })
            return
        }
        res.status(200).json(blogs)
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

router.post(ROUTES.recipe, async (req: Request, res: Response) => {
    try {
        const recipeProperties = pick(req.body, ['name', 'servings', 'caloriesPerPerson', 'cookTime', 'prepTime', 'notes'])
        let recipe
        if (!req.body._id || req.body._id === 'new') {
            recipe = await new Recipe({ ...recipeProperties, _id: undefined }).save()
        } else {
            recipe = await Recipe.findByIdAndUpdate(req.body._id, {...recipeProperties})
        }

        if (req.body._id === 'new') {
            // add new ingredients
            await Promise.allSettled(req.body?.ingredients?.map(async (ingredient: Partial<IIngredient & IRecipeIngredient>) => {
                const ingredientProperties = pick(ingredient, ['name', 'type', 'description'])
                const newIngredient = await new Ingredient({ ...ingredientProperties }).save()
                const recipeIngProperties = pick(ingredient, ['quantity', 'prep'])
                await new RecipeIngredient({ ...recipeIngProperties, recipe: recipe?._id, ingredient: newIngredient._id }).save()
            }))
            // add recipe steps
            await Promise.allSettled(req.body?.steps?.map(async (step: Partial<IStep>, index: number) => {
                await new Step({ recipe: recipe?._id, instruction: step.instruction, order: index }).save()
            }))
        }

        // TO DO: allow editing of your own recipes
        return res.status(200).json(req.body)
    } catch (error) {
        return return500Error(res, error)
    }
})

// get recipe and all data by id
router.get(`${ROUTES.recipe}/:id`, async (req: Request, res: Response) => {
    try {
        if (!req.params?.id) {
            return res.status(400).json({ error: 'Please provide a recipe ID' })
        }
        const recipe = await Recipe.findById(req.params.id)
        
        const ingredients = await RecipeIngredient.find({ recipe: req.params.id }).populate('ingredient').select(' -recipe')
        const steps = await Step.find({ recipe: req.params.id }).select(' -recipe')

        return res.status(200).json({
            ...recipe,
            ingredients,
            steps
        })
    } catch (error) {
        return return500Error(res, error)
    }
})

BaseRouter(router, {
    route: ROUTES.recipe,
    model: Recipe,
    excludedRoutes: ['get-one', 'post', 'delete']
})

BaseRouter(router, {
    route: ROUTES.category,
    model: Category,
    excludedRoutes: ['post', 'delete']
})

export default router