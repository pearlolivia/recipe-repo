import { useNavigate } from "react-router"
import { Button } from "@/components/Molecules"

const NotFoundPage = () => {
    const navigate = useNavigate()

    const handleBack = () => navigate(-1)

    return (
        <div className="flex flex-col">
            404
            <br />
            Page not found
            <Button onClick={handleBack} >Go Back</Button>
        </div>
    )
}

export default NotFoundPage