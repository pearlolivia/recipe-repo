import { api, api_delete } from "@/services/api.service";
import { useEffect, useState } from "react";

export function useData<T>(
    endpoint: string
)
: [data: T | null, setData: (v: T | null) => void,
    {
        isLoading: boolean;
        error: string | null;
        reload: () => Promise<void>;
        deleteData: (id: string) => Promise<void>
    }
] {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchData = async () => {
        setIsLoading(true)
        const res = await api(endpoint).finally(() => setIsLoading(false))
        if (!!res.data?.error) {
            setError(res.data?.error)
            return
        }
        setData(res.data)
    }

    const deleteData = async (id: string) => {
        setIsLoading(true)
        const res = await api_delete(`${endpoint}/${id}`).finally(() => setIsLoading(false))

        if (!!res?.error || res.status !== 204) {
            setError(res?.error ?? 'Failed to delete')
        }
    }

    useEffect(() => {
        fetchData()
    }, [endpoint])

    return [data, setData, { isLoading, error, reload: fetchData, deleteData }]
}