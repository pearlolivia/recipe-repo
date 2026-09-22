import Field from "@/components/Form/Field"
import { useAuth } from "@/hooks/useAuth"
import { useData } from "@/hooks/useData"
import { IRecipe } from "@/MODELS"
import ROUTES from "@/ROUTES"
import { IconAvocado, IconBread, IconBurger, IconCarrot, IconCheese, IconCherry, IconClock, IconDumpling, IconEggFried, IconFish, IconFlame, IconSalad, IconSausage, IconSoup } from "@tabler/icons-react"
import { formatDistanceToNow } from "date-fns"
import { useMemo, useState } from "react"
import { Link } from "react-router"

const Dashboard = () => {
    const { user } = useAuth()
    const [recipes] = useData<IRecipe[]>(ROUTES.app.recipe)

    const [searchField, setSearchField] = useState<{ search: string }>({ search: '' })

    return (
        <div className="space-y-2">
            <h1 className="text-wine font-bold">Welcome, {user.firstName}</h1>
            <Field placeholder="Search recipes..." type="text" field='search' label='' formValues={searchField} setFormValues={(v) => setSearchField({ search: v?.search ?? '' })} />
            <div className="flex flex-col gap-5">
                {recipes?.map((recipe) => (
                    <RecipeCard recipe={recipe} />
                ))}
            </div>
        </div>
    )
}

const ICONS = [IconSoup, IconBurger, IconAvocado, IconBread, IconCarrot, IconCheese, IconCherry, IconDumpling, IconEggFried, IconFish, IconSalad, IconSausage]

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
    const totalTime = (recipe?.prepTime ?? 0) + (recipe?.cookTime ?? 0)

    const Icon = useMemo(() => {
        const max = ICONS.length - 1
        const rndmIdx = Math.floor(Math.random() * max)
        return ICONS?.[rndmIdx] ?? IconSoup
    }, [])
console.log(recipe)
    return (
        <Link to={`/view-recipe/${recipe._id}`}>
            <div className="cursor-pointer hover:scale-105 bg-brand-300 p-5 rounded-xl border flex items-center gap-4">
                <section className="bg-wine p-5 rounded-xl text-brand-300">
                    <Icon size={30} />
                </section>

                <section className="space-y-2 w-full">
                    <p className="text-wine-900 font-semibold text-lg">{recipe.name}</p>
                    <div className="flex items-center gap-5 justify-between w-full">
                        <div className="flex items-center gap-5 text-neutral-900">
                            {recipe?.prepTime && recipe?.cookTime && (<div className="flex items-center gap-2"><IconClock /> <span>{totalTime} minutes</span></div>)}
                            {recipe?.caloriesPerPerson && (<div className="flex items-center gap-2"><IconFlame /> <span>~{recipe?.caloriesPerPerson} kcal</span></div>)}
                        </div>
                        {recipe?.createdAt && (<div className="text-neutral-900 text-sm">Added {formatDistanceToNow(recipe.createdAt, { addSuffix: true })}</div>)}
                    </div>
                </section>
            </div>
        </Link>
    )
}

export default Dashboard