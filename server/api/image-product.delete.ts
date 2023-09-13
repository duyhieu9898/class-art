import { kv } from '@vercel/kv'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const stringValue = JSON.stringify(body.imageItem)
  const res = await kv.lrem('image_product', 1, stringValue)
  return { res }
})
