import { getPayload } from 'payload'
import config from '@payload-config'

export async function getTestimonials() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'sortOrder',
  })
  return result.docs
}
