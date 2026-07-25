import { getPayload } from 'payload'
import config from '@payload-config'
import { mockTestimonials } from '@/lib/mocks/mock-data'

export async function getTestimonials() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'testimonials',
      limit: 100,
      sort: 'sortOrder',
    })
    return result.docs
  } catch {
    return mockTestimonials
  }
}
