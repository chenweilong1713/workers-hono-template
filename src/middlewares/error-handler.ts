// src/middlewares/error-handler.ts
import type { Context } from 'hono'
import { ZodError } from 'zod'
import { Result } from '../utils/result'
import { Errors } from '../errors/errors'
import { AppError } from '../errors/AppError'

export function errorHandler(err: unknown, c: Context) {
    const isDev = c.env?.ENV === 'dev'

    // 1️⃣ 业务异常
    if (err instanceof AppError) {
        return Result.fromError(c, err)
    }

    // 2️⃣ 参数校验异常
    if (err instanceof ZodError) {
        return Result.fromError(
            c,
            Errors.BadRequest(err.errors[0]?.message ?? '参数校验失败')
        )
    }

    // 3️⃣ 未知异常
    console.error('[Unhandled Error]', err)

    const internal = Errors.Internal(
        isDev && err instanceof Error ? err.message : undefined
    )

    return Result.fromError(c, internal)
}
