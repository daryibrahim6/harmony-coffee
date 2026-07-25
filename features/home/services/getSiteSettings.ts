import { getPayload } from 'payload'
import config from '@payload-config'
import { mockSiteSettings } from '@/lib/mocks/mock-data'

export async function getSiteSettings() {
  try {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'site-settings' })
  } catch {
    return mockSiteSettings
  }
}
