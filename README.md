# Workers Hono Template

这是一个基于 Hono 框架的 Cloudflare Workers 快速开发模板，提供了统一的响应格式、错误处理、请求ID追踪等常用功能。

## 技术栈

- [Hono](https://hono.dev/) - 轻量级 Web 框架
- [Cloudflare Workers](https://workers.cloudflare.com/) - 无服务器计算平台
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript 超集
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) - Cloudflare Workers 命令行工具

## 特性

- ✅ 统一的 API 响应格式
- ✅ CORS 跨域支持
- ✅ 全局错误处理
- ✅ 请求ID追踪
- ✅ 类型安全
- ✅ 灵活的中间件支持

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 开发模式

```bash
wrangler dev --local
```

### 3. 部署

```bash
# 请先通过wrangler login登录 cloudflare
wrangler deploy
```

## API 响应格式

所有 API 接口都遵循统一的响应格式：

```json
{
  "success": true,
  "code": "OK",
  "message": "success",
  "data": "Hello World",
  "requestId": "5b0de78d-1f80-445e-bfdb-2c957a2329cf"
}
```

### 字段说明

- `success`: 布尔值，表示请求是否成功
- `code`: 状态码，成功时为 "OK"
- `message`: 响应消息
- `data`: 响应数据（可选）
- `requestId`: 请求ID，用于追踪请求（可选）

## 项目结构

```
src/
├── api/                    # API 路由定义
│   └── hello.api.ts        # 示例 API
├── constants/              # 常量定义
│   └── error-code.ts       # 错误码定义
├── errors/                 # 错误处理
│   ├── AppError.ts         # 应用错误类
│   └── errors.ts           # 错误定义
├── middlewares/            # 中间件
│   ├── error-handler.ts    # 错误处理中间件
│   ├── not-found.ts        # 404 处理中间件
│   └── request-id.ts       # 请求ID中间件
├── types/                  # 类型定义
│   └── response.ts         # 响应类型定义
├── utils/                  # 工具函数
│   └── result.ts           # 统一响应工具
└── app.ts                  # 应用入口
```

## 示例 API

项目包含一个示例 API `/api/hello`，返回 "Hello World" 消息。

请求:
```
GET /api/hello
```

响应:
```json
{
  "success": true,
  "code": "OK",
  "message": "success",
  "data": "Hello World",
  "requestId": "5b0de78d-1f80-445e-bfdb-2c957a2329cf"
}
```

## 添加新 API

1. 在 `src/api/` 目录下创建新的 API 文件
2. 定义路由并使用统一的响应格式

```typescript
import { Hono } from "hono";
import { Result } from "../utils/result";

export const newApi = new Hono<{ Bindings: Env }>();

newApi.get("/", async (c) => {
  return Result.ok(c, { message: "Hello from new API" });
});
```

3. 在 `src/app.ts` 中导入并注册路由

```typescript
import { newApi } from "./api/new.api";

// 在 app.route 中注册
app.route('/api/new', newApi);
```

## 错误处理

模板提供统一的错误处理机制，可以通过 `Result.fail()` 方法返回错误信息：

```typescript
import { Result } from "../utils/result";

// 在路由中处理错误
newApi.get("/", async (c) => {
  try {
    // 业务逻辑
    return Result.ok(c, data);
  } catch (error) {
    return Result.fail(c, "ERROR_CODE", "Error message", 500);
  }
});
```

## 中间件

### CORS 中间件

自动配置 CORS 支持，允许跨域请求。

### 请求ID中间件

为每个请求生成唯一的ID，便于调试和追踪。

### 错误处理中间件

捕获并处理所有未处理的异常。

## 环境变量

在 `worker-configuration.d.ts` 中定义了环境变量类型，可在代码中安全使用。

## 部署配置

在 `wrangler.toml` 中配置部署选项，如路由、环境变量等。

## 许可证

MIT