import { getPayload } from 'payload'
import config from '@payload-config'

export async function getStandards() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'standards',
    limit: 100,
    sort: 'sortOrder',
  })
  return result.docs
}
