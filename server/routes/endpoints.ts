const endpoints = {
    app: {
        example: '/example'
    }
}

export const ENDPOINTS = JSON.parse(JSON.stringify(endpoints))

for (const [router, routes] of Object.entries(endpoints)) {
    for (const [name, endpoint] of Object.entries(routes)) {
        endpoints[router][name] = `${router}${endpoint}`
    }
}

const ROUTES = Object.assign({}, endpoints) as typeof endpoints
export default ROUTES