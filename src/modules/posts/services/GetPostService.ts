import { prisma } from '../../../infra/prisma'

export class GetPostService {
  async execute(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        likes: {
          select: {
            userId: true,
            createdAt: true,
          },
        },
      },
    })

    if (!post) throw new Error('Post not found')

    return post
  }
}
