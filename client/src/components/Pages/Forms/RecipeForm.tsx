import Field from "@/components/Form/Field"
import Form from "@/components/Form/Form"
import ROUTES from "@/ROUTES"
import { IRecipe } from '../../../../../server/models/recipe.model'
import { IIngredient } from '../../../../../server/models/ingredient.model'
import { useParams } from "react-router"
import { Button } from "@/components/Molecules"
import Empty from "@/components/Molecules/Empty/Empty"

const RecipeForm = ({ id }: { id?: string }) => {
    const params = useParams()
    const recipeId = params?.id ?? id ?? 'new'
    const isNew = recipeId === 'new'

    return (
        <div className='space-y-6 flex-col flex w-full'>
            <h1>{isNew ? 'New' : 'Edit'} Recipe</h1>
            <Form<IRecipe & { ingredients: Partial<IIngredient>[] }>
                endpoint={ROUTES.app.recipe}
                id={recipeId}
            >
                {(f, { formValues, setFormValues }) => (
                    <div className="space-y-5">
                        <section className="flex items-end gap-10">
                            <div className="space-y-2">
                                {formValues?.ingredients?.map((ingredient: Partial<IIngredient>, index: number) => (
                                    <div className="flex items-end gap-5">
                                        <span className="text-xl mb-1">{index + 1}. </span>
                                        <Field
                                            field="item"
                                            formValues={ingredient}
                                            onChange={(v) => {
                                                const newIngredients = [...(formValues?.ingredients ?? [])]
                                                newIngredients[index] = {
                                                    ...ingredient,
                                                    item: v
                                                }
                                                return setFormValues({
                                                    ...formValues,
                                                    ingredients: newIngredients
                                                })
                                            }}
                                            type="text"
                                        />
                                        <Field
                                            field="quantity"
                                            formValues={ingredient}
                                            onChange={(v) => {
                                                const newIngredients = [...(formValues?.ingredients ?? [])]
                                                newIngredients[index] = {
                                                    ...ingredient,
                                                    quantity: v
                                                }
                                                return setFormValues({
                                                    ...formValues,
                                                    ingredients: newIngredients
                                                })
                                            }}
                                            type="text"
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

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-lg border">
                            <Field {...f('servings')} type="number" />
                            <Field {...f('caloriesPerPerson')} type="number" />
                            <Field {...f('time.prep')} type="number" label="Prep Time" />
                            <Field {...f('time.cook')} type="number" label="Cook Time" />
                        </section>
                    </div>
                )}
            </Form>
        </div>
    )
}

export default RecipeForm