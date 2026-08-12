import Empty from "@/components/Molecules/Empty/Empty"
import { useData } from "@/hooks/useData"
import { ICategory } from "@/MODELS"
import ROUTES from "@/ROUTES"

const CategoryForm = () => {
    const [categories] = useData<ICategory[]>(ROUTES.app.category)

    return (
        <div>
            {!categories?.length && <Empty header='No categories yet' subheader="Create a new category to label your recipes with" />}
            {categories?.map((category) => (
                <div>
                    <span>{category.name}</span>
                </div>
            ))}
        </div>
    )
}

export default CategoryForm