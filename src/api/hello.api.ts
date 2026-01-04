import { Hono } from "hono";
import {Result} from "../utils/result";



export const helloApi = new Hono<{ Bindings: Env }>();


helloApi.get("/", async (c) => {
    return Result.ok(c,"Hello World")
})