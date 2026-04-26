import { Router } from 'express'
import { LikesController } from '../controllers/LikesController'

const likesRouter = Router()
const likesController = new LikesController()

likesRouter.get('/', likesController.list)
likesRouter.get('/ranking', likesController.index)
likesRouter.get('/:postId', likesController.show)
likesRouter.post('/:postId/like', likesController.create)
likesRouter.post('/', likesController.store)

export { likesRouter }
