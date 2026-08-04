export const api = async (endpoint: string, body?: any) => {
    const method = body ? 'POST' : 'GET'
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null
    })
    .then(async (res) => {
        let body
        try {
            body = await res.json()
        } catch (e) {
            console.error('API response error: ', e)
        }
        return {
            staus: res.status,
            message: res.statusText,
            data: body
        }
    })
    .catch((errRes) => {
        if (errRes?.status === 401) {
            window.location.replace('/')
        }
        return errRes
    })

    return response
}