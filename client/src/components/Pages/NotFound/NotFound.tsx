import { useNavigate } from "react-router"
import { Button } from "@/components/Molecules"

const NotFoundPage = ({ message } : { message?: string }) => {
    const navigate = useNavigate()

    const handleBack = () => navigate(-1)

    return (
        <div className="flex flex-col">
            404
            <br />
            Page not found
            {message && <span>{message}</span>}
            <Button onClick={handleBack} >Go Back</Button>
        </div>
    )
}

export default NotFoundPage