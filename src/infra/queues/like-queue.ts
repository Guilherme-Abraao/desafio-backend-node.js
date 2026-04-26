import { Queue, Worker } from 'bullmq'
import { redis } from '../redis'
import { prisma } from '../prisma'

const QUEUE_NAME = 'like-processing'

export const likeQueue = new Queue(QUEUE_NAME, {
  connection: redis,
})

export const likeWorker = new Worker(
  QUEUE_NAME,
  async (job) => {
    const { postId, userId } = job.data

    try {
      await prisma.$transaction([
        prisma.like.create({
          data: { postId, userId },
        }),
        prisma.post.update({
          where: { id: postId },
          data: { likesCount: { increment: 1 } },
        }),
      ])

      await redis.zincrby('posts:ranking', 1, postId)

      console.log(`✅ [Worker] Processado: Post ${postId} por User ${userId}`)
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`ℹ️ [Worker] Like ignorado (duplicado): Post ${postId}`)
        return
      }

      console.error(`❌ [Worker] Erro ao processar: ${error.message}`)
      throw error
    }
  },
  { connection: redis },
)
