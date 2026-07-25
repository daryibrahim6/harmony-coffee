import { getPayload } from 'payload'
import config from '@payload-config'
import { mockStandards } from '@/lib/mocks/mock-data'

export async function getStandards() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'standards',
      limit: 100,
      sort: 'sortOrder',
    })
    return result.docs
  } catch {
    return mockStandards
  }
}
