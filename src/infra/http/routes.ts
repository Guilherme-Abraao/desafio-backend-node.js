import { Router } from 'express'
import { likesRouter } from '../../modules/posts/http/routes/LikesRoutes'

const routes = Router()

routes.use('/posts', likesRouter)

export { routes }
