// src/constants/error-code.ts
export const ErrorCode = {
    OK: 'OK',

    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',

    PARAM_INVALID: 'PARAM_INVALID',

    RATE_LIMIT: 'RATE_LIMIT',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const

export type ErrorCode =
    typeof ErrorCode[keyof typeof ErrorCode]
