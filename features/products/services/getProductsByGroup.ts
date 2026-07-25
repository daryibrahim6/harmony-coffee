import { getPayload } from 'payload'
import config from '@payload-config'
import { mockProducts } from '@/lib/mocks/mock-data'

export async function getProductsByGroup(groupSlug: string) {
  try {
    const payload = await getPayload({ config })

    const groupResult = await payload.find({
      collection: 'product-groups',
      where: { slug: { equals: groupSlug } },
      limit: 1,
    })

    if (!groupResult.docs.length) return []

    const productResult = await payload.find({
      collection: 'products',
      where: {
        and: [
          { productGroup: { equals: groupResult.docs[0].id } },
          { _status: { equals: 'published' } },
        ],
      },
      limit: 100,
      sort: 'sortOrder',
      depth: 2,
    })

    return productResult.docs.length > 0 ? productResult.docs : mockProducts[groupSlug] ?? []
  } catch {
    return mockProducts[groupSlug] ?? []
  }
}
