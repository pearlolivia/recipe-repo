import { Loading } from "@/components/Molecules"
import { useAuth } from "@/hooks/useAuth"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Logout = () => {
    const { clearUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        logout()
    }, [])

    async function logout() {
        clearUser()
        localStorage.removeItem('token')
        navigate('/register')
    }
    return (
        <div className="flex flex-col gap-2 max-w-4xl">
            <div className="mx-auto">
                <Loading />
                <p>Logging out...</p>
            </div>
        </div>
    )
}

export default Logout