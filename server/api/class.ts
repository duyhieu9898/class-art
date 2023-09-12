import { kv } from '@vercel/kv'

export default defineEventHandler(async (_event) => {
  const res = await kv.lrange('class', 0, -1)
  return {
    data: res,
  }
})
