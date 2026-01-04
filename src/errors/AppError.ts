// src/errors/AppError.ts
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import type { ErrorCode } from '../constants/error-code'

export class AppError extends Error {
    readonly code: ErrorCode
    readonly status: ContentfulStatusCode

    constructor(
        message: string,
        code: ErrorCode,
        status: ContentfulStatusCode
    ) {
        super(message)
        this.code = code
        this.status = status
    }
}
