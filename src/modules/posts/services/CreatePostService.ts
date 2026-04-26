import { prisma } from '../../../infra/prisma'

interface CreatePostRequest {
  title: string
  content: string
}

export class CreatePostService {
  async execute({ title, content }: CreatePostRequest) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        likesCount: 0,
      },
    })

    return post
  }
}
