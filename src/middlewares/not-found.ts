// src/middlewares/not-found.ts
import type { Context } from 'hono'
import { Result } from '../utils/result'
import { Errors } from '../errors/errors'

export function notFoundHandler(c: Context) {
    return Result.fromError(c, Errors.NotFound('接口不存在'))
}
