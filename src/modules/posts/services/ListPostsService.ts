import { prisma } from '../../../infra/prisma'

export class ListPostsService {
  async execute() {
    return await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}
