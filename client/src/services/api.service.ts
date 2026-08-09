// token will stored in local storage (for now)
export const api = async (endpoint: string, body?: any) => {
    const token = JSON.parse(localStorage.getItem('token') ?? '')?.accessToken
    const method = body ? 'POST' : 'GET'
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : null
    })
    .then(async (res) => {
        if (res.status === 403) {
            window.location.assign('/logout')
            return {
                status: 403,
                message: 'Forbidden',
                error: 'Forbidden',
            }
        }

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

    // refresh access token??

    return response
}

export const api_delete = async (endpoint: string) => {
    let token = JSON.parse(localStorage.getItem('token') ?? '')?.accessToken
    let method = 'DELETE'

    let res = await fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    if (res.status === 403) {
        window.location.assign('/logout')
        return {
            status: 403,
            message: 'Forbidden',
            error: 'Forbidden',
        }
    }

    if (res.status !== 401) {
        return {
            status: res.status,
            message: res.statusText,
        }
    }

    return {
        status: res.status,
        message: res.statusText,
    }
}