import type { Payload } from 'payload'

let cachedPayload: Payload | null = null

export async function getPayloadClient(): Promise<Payload | null> {
  if (cachedPayload) return cachedPayload
  try {
    const { getPayload } = await import('payload')
    const config = await import('@/payload.config')
    cachedPayload = await getPayload({ config: config.default })
    return cachedPayload
  } catch {
    return null
  }
}

export async function getCollectionCount(collection: string): Promise<number | null> {
  const payload = await getPayloadClient()
  if (!payload) return null
  try {
    const result = await payload.count({ collection: collection as any })
    return result.totalDocs
  } catch {
    return null
  }
}
