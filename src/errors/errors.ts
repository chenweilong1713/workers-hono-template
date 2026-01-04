// src/errors/errors.ts
import { AppError } from './AppError'
import { ErrorCode } from '../constants/error-code'

export const Errors = {
    BadRequest: (msg = '请求参数错误') =>
        new AppError(msg, ErrorCode.BAD_REQUEST, 400),

    Unauthorized: (msg = '未授权') =>
        new AppError(msg, ErrorCode.UNAUTHORIZED, 401),

    Forbidden: (msg = '无权限访问') =>
        new AppError(msg, ErrorCode.FORBIDDEN, 403),

    NotFound: (msg = '资源不存在') =>
        new AppError(msg, ErrorCode.NOT_FOUND, 404),

    RateLimit: (msg = '请求过于频繁') =>
        new AppError(msg, ErrorCode.RATE_LIMIT, 429),

    Internal: (msg = '服务器内部错误') =>
        new AppError(msg, ErrorCode.INTERNAL_ERROR, 500),
} as const
