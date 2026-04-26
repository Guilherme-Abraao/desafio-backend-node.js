import { redis } from '../../../infra/redis'

export class GetRankingService {
  async execute() {
    const result = await redis.zrevrange('posts:ranking', 0, 2, 'WITHSCORES')

    const ranking = []
    for (let i = 0; i < result.length; i += 2) {
      ranking.push({
        postId: result[i],
        likes: parseInt(result[i + 1]),
      })
    }
    return ranking
  }
}
