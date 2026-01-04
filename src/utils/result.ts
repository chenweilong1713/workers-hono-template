// src/utils/result.ts
import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import type { ApiResponse } from '../types/response'
import type { ErrorCode } from '../constants/error-code'
import type { AppError } from '../errors/AppError'

export class Result {
    static ok<T>(
        c: Context,
        data?: T,
        message = 'success',
        status: ContentfulStatusCode = 200
    ) {
        const res: ApiResponse<T> = {
            success: true,
            code: 'OK',
            message,
            data,
            requestId: c.get('requestId'),
        }

        return c.json(res, status)
    }

    static fail(
        c: Context,
        code: ErrorCode,
        message: string,
        status: ContentfulStatusCode
    ) {
        const res: ApiResponse = {
            success: false,
            code,
            message,
            requestId: c.get('requestId'),
        }

        return c.json(res, status)
    }

    /** AppError → Result */
    static fromError(c: Context, err: AppError) {
        return Result.fail(c, err.code, err.message, err.status)
    }
}
