import { api, api_delete } from "@/services/api.service"
import { useEffect, useState } from "react"

export function useApi<T>(
    endpoint: string,
    options?: { preventLoading?: boolean }
): [
    data: T | null,
    setData: React.Dispatch<React.SetStateAction<T | null>>,
    resource: {
        message?: string,
        error?: string,
        status?: number,
        isLoading?: boolean,
        get: () => Promise<T>,
        post: (body: any) => Promise<void>,
        _delete: () => Promise<void>
    }
] {
    const [data, setData] = useState<T | null>(null)
    const [message, setMessage] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const [status, setStatus] = useState<number | undefined>(undefined)
    const [isLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!endpoint) {
            setLoading(false)
            return
        }
        get()
    }, [endpoint])

    async function get(): Promise<T> {
        if (!options?.preventLoading) {
            setLoading(true)
        }
        return await api(endpoint)
            .then((response) => {
                setData(response?.data ?? null)
                setMessage(response?.message)
                setStatus(response?.status)
                setError(response?.error)
                return response?.data ?? null
            })
            .catch((reason) => {
                setError(reason)
                return null
            })
            .finally(() => {
                if (!options?.preventLoading) {
                    setLoading(false)
                }
            })
    }

    async function post(body: any): Promise<void> {
        setLoading(true)
        await api(endpoint, body)
            .then((response) => {
                setMessage(response?.message)
                setStatus(response?.status)
                setError(response?.error)
            })
            .catch((reason) => {
                setError(reason)
            })
            .finally(() => setLoading(false))
    }

    async function _delete(id?: string): Promise<void> {
        await api_delete(id ? `${endpoint}/${id}` : endpoint)
            .then((response) => {
                setMessage(response?.message)
                setStatus(response?.status)
                setError(response?.error)
            })
            .catch((reason) => {
                setError(reason)
            })
            .finally(() => {
                if (!options?.preventLoading) {
                    setLoading(false)
                }
            })
    }

    return [data, setData, { message, error, status, isLoading, get, post, _delete }]
}