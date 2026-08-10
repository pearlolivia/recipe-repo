import { Loading } from "@/components/Molecules"
import { NotFoundPage } from "@/components/Pages"
import {useAuth} from "@/hooks/useAuth"
import { useEffect, useLayoutEffect } from "react"
import { Navigate, Outlet } from "react-router"

export const AuthWrapper = () => {
    const { user, getUser, status } = useAuth()

    useLayoutEffect(() => {
        getUser()
    }, [])
console.log(status)
    if (!user || status === 'unauthorized') {
        return <Navigate to='/logout' replace />
    }

    if (status === 'authorized') {
        return <Outlet />
    }

    return <Loading />
}