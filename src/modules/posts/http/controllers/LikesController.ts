import { Request, Response } from 'express'
import { z } from 'zod'
import { LikePostService } from '../../services/LikePostService'
import { GetRankingService } from '../../services/GetRankingService'
import { ListPostsService } from '../../services/ListPostsService'
import { GetPostService } from '../../services/GetPostService'
import { CreatePostService } from '../../services/CreatePostService'

export class LikesController {
  async list(req: Request, res: Response): Promise<Response> {
    const listPostsService = new ListPostsService()
    const posts = await listPostsService.execute()

    return res.json(posts)
  }

  async show(req: Request, res: Response): Promise<Response> {
    const postId = req.params.postId as string

    const getPostService = new GetPostService()
    const post = await getPostService.execute(postId)

    return res.json(post)
  }

  async create(req: Request, res: Response): Promise<Response> {
    const likeSchema = z.object({
      userId: z.string().uuid(),
    })

    const { userId } = likeSchema.parse(req.body)
    const postId = req.params.postId as string

    const likePostService = new LikePostService()
    await likePostService.execute({ postId, userId })

    return res.status(202).json({ message: 'Curtida em processamento!' })
  }

  async index(req: Request, res: Response): Promise<Response> {
    const getRankingService = new GetRankingService()
    const ranking = await getRankingService.execute()

    return res.json(ranking)
  }

  async store(req: Request, res: Response): Promise<Response> {
    const postSchema = z.object({
      title: z.string().min(3),
      content: z.string().min(10),
    })

    const { title, content } = postSchema.parse(req.body)

    const createPostService = new CreatePostService()
    const post = await createPostService.execute({ title, content })

    return res.status(201).json(post)
  }
}
