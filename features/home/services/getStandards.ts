import { mockStandards } from '@/lib/mocks/mock-data'

export async function getStandards() {
  if (process.env.VERCEL || process.env.SKIP_DB) return mockStandards
  try {
    const { getPayload } = await import('payload')
    const config = (await import('@payload-config')).default
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'standards',
      limit: 100,
      sort: 'sortOrder',
    })
    return result.docs.length > 0 ? result.docs : mockStandards
  } catch {
    return mockStandards
  }
}
