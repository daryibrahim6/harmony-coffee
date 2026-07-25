import { describe, it, expect } from 'vitest'
import { mockStandards, mockTestimonials, mockProducts, mockSiteSettings } from '@/lib/mocks/mock-data'

describe('Mock Data', () => {
  it('mockStandards has 4 items', () => {
    expect(mockStandards).toHaveLength(4)
  })

  it('mockTestimonials has 3 items', () => {
    expect(mockTestimonials).toHaveLength(3)
  })

  it('mockProducts has robusta, arabica, green keys', () => {
    expect(mockProducts).toHaveProperty('robusta')
    expect(mockProducts).toHaveProperty('arabica')
    expect(mockProducts).toHaveProperty('green')
  })

  it('mockProducts robusta has 2 products', () => {
    expect(mockProducts.robusta).toHaveLength(2)
  })

  it('mockProducts arabica has 2 products', () => {
    expect(mockProducts.arabica).toHaveLength(2)
  })

  it('mockProducts green has 1 product', () => {
    expect(mockProducts.green).toHaveLength(1)
  })

  it('mockSiteSettings has brandName', () => {
    expect(mockSiteSettings.brandName).toBeTruthy()
  })

  it('mockSiteSettings has whatsappNumber', () => {
    expect(mockSiteSettings.whatsappNumber).toBeTruthy()
  })

  it('mockSiteSettings hero has title and tagline', () => {
    expect(mockSiteSettings.hero?.title).toBeTruthy()
    expect(mockSiteSettings.hero?.tagline).toBeTruthy()
  })

  it('mockSiteSettings about has pullquote and paragraphs', () => {
    expect(mockSiteSettings.about?.pullquote).toBeTruthy()
    expect(mockSiteSettings.about?.paragraphs).toHaveLength(3)
  })

  it('mockSiteSettings about has 3 stats', () => {
    expect(mockSiteSettings.about?.stats).toHaveLength(3)
  })

  it('mockSiteSettings cta has heading and points', () => {
    expect(mockSiteSettings.cta?.heading).toBeTruthy()
    expect(mockSiteSettings.cta?.points).toHaveLength(3)
  })

  it('mockSiteSettings footer has tagline and address', () => {
    expect(mockSiteSettings.footer?.tagline).toBeTruthy()
    expect(mockSiteSettings.footer?.address).toBeTruthy()
  })

  it('mockSiteSettings social has all links', () => {
    expect(mockSiteSettings.social?.instagram).toBeTruthy()
    expect(mockSiteSettings.social?.tiktok).toBeTruthy()
    expect(mockSiteSettings.social?.shopee).toBeTruthy()
    expect(mockSiteSettings.social?.tokopedia).toBeTruthy()
  })

  it('all products have title and id', () => {
    for (const group of Object.values(mockProducts)) {
      for (const product of group) {
        expect(product.id).toBeDefined()
        expect(product.title).toBeTruthy()
      }
    }
  })
})
