import { likeQueue } from '../../../infra/queues/like-queue'

interface LikePostRequest {
  postId: string
  userId: string
}

export class LikePostService {
  async execute({ postId, userId }: LikePostRequest): Promise<void> {
    await likeQueue.add('process-like', { postId, userId })
  }
}
