import { kv } from '@vercel/kv'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stringValue = JSON.stringify(body.imageItem)
  const res = await kv.rpush('image_product', stringValue)
  return { res }
})
