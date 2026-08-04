import { Request, Response, Router } from 'express'
import { Model } from 'mongoose'

/**
 * add to boilerplate
 */
interface RouterConfig {
    model: Model<any>
    route: string
    excludedRoutes?: ('get-one' | 'get' | 'post' | 'delete')[]
    populate?: string[]
    userSpecific?: boolean
    userField?: string
}

const return500Error = (res: Response, e: any) => {
    return res.status(500).json({ error: e })
}

const BaseRouter = (router: Router, config: RouterConfig) => {
    const {
        model,
        route,
        excludedRoutes,
        populate
    } = config
    // get all
    if (!excludedRoutes?.includes('get')) {
        router.get(route, async (req: Request, res: Response) => {
            try {
                let query = model.find()
                if (populate) {
                    query = query.populate(populate)
                }
                const items = await query.exec()
                return res.status(200).json(items)
            } catch (e) {
                return500Error(res, e)
            }
        })
    }

    //get one
    if (!excludedRoutes?.includes('get-one')) {
        router.get(`${route}/:id`, async (req: Request, res: Response) => {
            try {
                const { id } = req.params
                let query = model.findById(id)
                if (!query) {
                    return res.status(404).json({ error: 'Item not found' })
                }
                if (populate) {
                    query = query.populate(populate)
                }
                const item = await query.exec()
                return res.status(200).json(item)
            } catch (e) {
                return500Error(res, e)
            }
        })
    }

    // post
    if (!excludedRoutes?.includes('post')) {
        router.post(route, async (req: Request, res: Response) => {
            try {
                if (!req.body._id || req.body._id === 'new') {
                    const created = await new model({ ...req.body, _id: undefined }).save()
                    return res.status(201).json({ message: 'successfully created', data: created })
                } else {
                    const updatedItem = await model.findByIdAndUpdate(req.body._id, req.body)
                    return res.status(201).json({ message: 'successfully updated', data: updatedItem })
                }
            } catch (e) {
                return500Error(res, e)
            }
        })
    }

    // delete
    if (!excludedRoutes?.includes('delete')) {
        router.delete(`${route}/:id`, async (req: Request, res: Response) => {
            try {
                const item = await model.findById(req.params.id)
                if (!item) {
                    return res.status(404).json({ error: 'Item not found' })
                }
                await model.findByIdAndDelete(req.params.id)
                return res.status(204).json({ message: 'successfully deleted' })
            } catch (e) {
                return500Error(res, e)
            }
        })
    }
}

export default BaseRouter