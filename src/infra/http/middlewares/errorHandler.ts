import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      issues: err.format(),
    })
  }

  if (err.message === 'Post not found') {
    return res.status(404).json({
      status: 'error',
      message: err.message,
    })
  }

  console.error(err)
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}
