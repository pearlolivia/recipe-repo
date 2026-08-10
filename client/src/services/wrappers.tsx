import { Loading } from "@/components/Molecules"
import {useAuth} from "@/hooks/useAuth"
import { useLayoutEffect } from "react"
import { Navigate, Outlet } from "react-router"

export const AuthWrapper = () => {
    const { user, getUser, status } = useAuth()

    useLayoutEffect(() => {
        getUser()
    }, [])

    if (!user || status === 'unauthorized') {
        return <Navigate to='/logout' replace />
    }

    if (status === 'authorized') {
        return <Outlet />
    }

    return <Loading />
}