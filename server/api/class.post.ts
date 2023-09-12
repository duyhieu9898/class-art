import { kv } from '@vercel/kv'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stringValue = JSON.stringify(body.classItem)
  const res = await kv.rpush('class', stringValue)
  return { res }
})
