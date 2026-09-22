import Field from "@/components/Form/Field"
import Form from "@/components/Form/Form"
import ROUTES from "@/ROUTES"
import { IRecipe } from '../../../../../server/models/recipe.model'
import { IIngredient, IngredientType } from '../../../../../server/models/ingredient.model'
import { IRecipeIngredient } from '../../../../../server/models/recipeIngredient.model'
import { IStep } from '../../../../../server/models/step.model'
import { useNavigate, useParams } from "react-router"
import { Button } from "@/components/Molecules"
import { useMemo } from "react"
import SelectField from "@/components/Form/SelectField"

const RecipeForm = ({ id }: { id?: string }) => {
    const navigate = useNavigate()
    const params = useParams()
    const recipeId = params?.id ?? id ?? 'new'
    const isNew = recipeId === 'new'

    const typeOptions = useMemo(() => {
        const typeArray = Object.entries(IngredientType)
        return typeArray.map(([label, value]) => ({
            label,
            value
        }))
    }, [])

    const handleIngredientsChange = (
        formValues: { [key: string]: any },
        setFormValues: (v: { [key: string]: any }) => void,
        index: number,
        newValue: any,
        field: string
    ) => {
        const newIngredients = [...(formValues?.ingredients ?? [])]
        const currentIngredient = newIngredients?.[index] ?? {}
        newIngredients[index] = {
            ...currentIngredient,
            [field]: newValue
        }
        return setFormValues({
            ...formValues,
            ingredients: newIngredients
        })
    }

    const handleStepsChange = (
        formValues: { [key: string]: any },
        setFormValues: (v: { [key: string]: any }) => void,
        index: number,
        newValue: any,
        field: string
    ) => {
        const newSteps = [...(formValues?.steps ?? [])]
        const currentStep = newSteps?.[index] ?? {}
        newSteps[index] = {
            ...currentStep,
            [field]: newValue
        }
        return setFormValues({
            ...formValues,
            steps: newSteps
        })
    }

    return (
        <div className='space-y-6 flex-col flex w-full'>
            <h1>{isNew ? 'New' : 'Edit'} Recipe</h1>
            <Form<IRecipe & { ingredients: Partial<IIngredient & IRecipeIngredient>[]; steps: Partial<IStep>[] }>
                endpoint={ROUTES.app.recipe}
                id={recipeId}
                className="p-8"
                submitText="Create Recipe"
                postSubmit={() => {
                    navigate('/')
                }}
            >
                {(f, { formValues, setFormValues }) => (
                    <div className="space-y-5">
                        <section className="p-5 rounded-lg border space-y-2">
                            <h2>Meal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
                                <Field {...f('name')} type="text" required label='Recipe Name' />
                                <Field {...f('servings')} type="number" required />
                                <Field {...f('prepTime')} type="number" label="Prep Time (minutes)" />
                                <Field {...f('cookTime')} type="number" label="Cook Time (minutes)" />
                                <Field {...f('caloriesPerPerson')} type="number" />
                                <Field {...f('notes')} type="text" label='Recipe notes?' />
                            </div>
                        </section>

                        <section className="space-y-5 border rounded-xl p-5">
                            <h2>Ingredients</h2>
                            <div className="space-y-5">
                                {formValues?.ingredients?.map((ingredient: Partial<IIngredient>, index: number) => (
                                    <div className="space-y-3  bg-brand-100 p-3 rounded-xl">
                                        <div className="flex items-center gap-5">
                                            <span className="text-xl mt-5">{index + 1}. </span>
                                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                                                <Field
                                                    field="name"
                                                    formValues={ingredient}
                                                    onChange={(v) => handleIngredientsChange(formValues, setFormValues, index, v, 'name')}
                                                    type="text"
                                                    required
                                                />
                                                <SelectField
                                                    field="type"
                                                    options={typeOptions}
                                                    onChange={(v) => handleIngredientsChange(formValues, setFormValues, index, v?.value ?? '', 'type')}
                                                    required
                                                />
                                                <Field
                                                    field="quantity"
                                                    formValues={ingredient}
                                                    onChange={(v) => handleIngredientsChange(formValues, setFormValues, index, v, 'quantity')}
                                                    type="text"
                                                    placeholder='E.g. 250g'
                                                    required
                                                />
                                                <Field
                                                    field="prep"
                                                    label="Preparation?"
                                                    formValues={ingredient}
                                                    onChange={(v) =>  handleIngredientsChange(formValues, setFormValues, index, v, 'prep')}
                                                    type="text"
                                                    placeholder='E.g. diced'
                                                />
                                            </div>
                                        </div>
                                        <Field
                                            field="description"
                                            label="Nutrition Information?"
                                            formValues={ingredient}
                                            onChange={(v) => {
                                                const newIngredients = [...(formValues?.ingredients ?? [])]
                                                newIngredients[index] = {
                                                    ...ingredient,
                                                    description: v
                                                }
                                                return setFormValues({
                                                    ...formValues,
                                                    ingredients: newIngredients
                                                })
                                            }}
                                            type="textarea"
                                            containerClass="pl-8"
                                            inputClass="h-24 md:w-80"
                                        />
                                    </div>
                                ))}
                            </div>
                            <Button.Secondary
                            className="mb-0.5"
                            onClick={() => {
                                setFormValues({
                                    ...formValues,
                                    ingredients: [...(formValues?.ingredients ?? []), {}]
                                })
                            }}>+ New Ingredient</Button.Secondary>
                        </section>

                        <section className="space-y-5 border rounded-xl p-5">
                            <h2>Method</h2>
                            <div className="space-y-5">
                                {formValues?.steps?.map((ingredient: Partial<IStep>, index: number) => (
                                    <div className="space-y-3 bg-wine-400 p-3 rounded-xl">
                                        <div className="flex items-center gap-5">
                                            <span className="text-xl mt-5">{index + 1}. </span>
                                            <div className="grid md:grid-cols-2 gap-5">
                                                <Field
                                                    field="instruction"
                                                    formValues={ingredient}
                                                    onChange={(v) => handleStepsChange(formValues, setFormValues, index, v, 'instruction')}
                                                    type="textarea"
                                                    inputClass="w-80 h-24"
                                                    required
                                                />
                                                {/* <SelectField field="ingredient" label="Ingredients" options={formValues?.ingredients?.map((ing: Partial<IIngredient>, i: number) => ({ value: i, label: ing.name}))} onChange={(v) => handleStepsChange(formValues, setFormValues, index, v?.value ?? '', 'ingredients')} isMulti inputClass="!w-full" /> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button.Secondary
                            className="mb-0.5 bg-wine-100 hover:bg-wine-200"
                            onClick={() => {
                                setFormValues({
                                    ...formValues,
                                    steps: [...(formValues?.steps ?? []), {}]
                                })
                            }}>+ New Step</Button.Secondary>
                        </section>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default RecipeForm