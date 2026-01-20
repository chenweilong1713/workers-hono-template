import { Hono } from "hono";
import {cors} from "hono/cors";
import {errorHandler} from "./middlewares/error-handler";
import {notFoundHandler} from "./middlewares/not-found";
import {requestIdMiddleware} from "./middlewares/request-id";
import {helloApi} from "./api/hello.api";
import { serveStatic } from "hono/serve-static";

const app = new Hono<{ Bindings: Env }>();

// ✅ 必须是第一行 middleware
app.use('*', cors({
  origin: '*', // ⚠️ 不建议 *
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));


// ✅ 必须兜底 OPTIONS（非常关键）
app.options('*', c => new Response(null, { status: 204 }));

// 前端静态资源
app.use('/*', serveStatic({ 
  root: './public',
  getContent: async (path, c) => {
    // 简单实现：直接返回文件内容或 null
    return null;
  }
}))

// 全局异常捕获
app.onError(errorHandler)
app.notFound(notFoundHandler)   // 404
app.use('/api/*', requestIdMiddleware)


app.route('/api/hello', helloApi)


// ✅ Worker 入口（非常关键）
export default {
  fetch(req: Request, env: Env, ctx: ExecutionContext) {
    console.log('🔥 worker hit:', req.method, req.url);
    return app.fetch(req, env, ctx);
  },
};
