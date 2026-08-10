import { createContext, useContext, useState } from "react"
import { IUser } from "../../../server/models/user.model"
import { api } from "@/services/api.service"
import ROUTES from "@/ROUTES"

const getLocalUser = () => {
    const cache = localStorage.getItem('cachedUser')
    if (!!cache) {
        return JSON.parse(cache)
    }
    return null
}

const initialValues = {
    user: getLocalUser(),
    getUser: () => {},
    clearUser: () => {},
    status: ''
}

const AuthContext = createContext(initialValues)

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(initialValues.user)
    const [status, setStatus] = useState<string>(initialValues.status)

    const getUser = async () => {
        const res = await api(ROUTES.auth.check)

        if (res.status === 400) {
            clearUser()
        }
        
        if (res.status === 200) {
            setUser(res?.data)
            setStatus('authorized')
            localStorage.setItem('cachedUser', JSON.stringify(res.data))
        }

        return null
    }

    const clearUser = () => {
        setUser(null)
        setStatus('unauthorized')
        localStorage.removeItem('cachedUser')
    }

    return (
        <AuthContext.Provider value={{ user, status, getUser, clearUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw 'Error using AuthProvider: please check and try again.'
    }
    return authContext
}

export {useAuth, AuthProvider}