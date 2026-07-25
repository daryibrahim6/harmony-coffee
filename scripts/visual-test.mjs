import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SCREENSHOTS_DIR = path.resolve(process.cwd(), 'screenshots')
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR)

async function run() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  const results = []

  // 1. Landing page screenshot
  console.log('1. Navigating to landing page...')
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-landing-full.png'), fullPage: true })
  results.push('✅ Landing page screenshot saved')

  // Check content presence
  const bodyText = await page.textContent('body')
  const checks = {
    'OUR STORY': bodyText.includes('OUR STORY'),
    'WHY CHOOSE US': bodyText.includes('WHY CHOOSE'),
    'TESTIMONIALS': bodyText.includes('TESTIMONIAL'),
    'Budi testimonial': bodyText.includes('Budi'),
    'Fresh & Natural': bodyText.includes('Fresh'),
    'ROBUSTA TROUPE': bodyText.includes('ROBUST'),
    'ARABICA TROUPE': bodyText.includes('ICA TROUPE'),
    'Green Bean': bodyText.includes('Green Bean') || bodyText.includes('GREEN BEAN'),
    'Ready to Order': bodyText.includes('Ready to Order'),
    'WhatsApp link': bodyText.includes('wa.me'),
    'Hero tagline': bodyText.includes('balancing'),
  }

  for (const [label, passed] of Object.entries(checks)) {
    results.push(`${passed ? '✅' : '❌'} ${label}`)
  }

  // 2. Screenshot Hero section
  console.log('2. Hero section screenshot...')
  const hero = await page.$('#hero, .hero')
  if (hero) {
    await hero.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-hero.png') })
    results.push('✅ Hero section screenshot saved')
  } else {
    results.push('❌ Hero section not found')
  }

  // 3. Screenshot About section
  console.log('3. About section screenshot...')
  const about = await page.$('#about, .about')
  if (about) {
    await about.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-about.png') })
    results.push('✅ About section screenshot saved')
  } else {
    results.push('❌ About section not found')
  }

  // 4. Screenshot Standards section
  console.log('4. Standards section screenshot...')
  const standard = await page.$('#standard, .standard-section')
  if (standard) {
    await standard.screenshot({ path: path.join(SCREENSHOTS_DIR, '04-standards.png') })
    results.push('✅ Standards section screenshot saved')
  } else {
    results.push('❌ Standards section not found')
  }

  // 5. Screenshot Roasted section
  console.log('5. Roasted section screenshot...')
  const roasted = await page.$('#roasted, .roasted-section')
  if (roasted) {
    await roasted.screenshot({ path: path.join(SCREENSHOTS_DIR, '05-roasted.png') })
    results.push('✅ Roasted section screenshot saved')
  } else {
    results.push('❌ Roasted section not found')
  }

  // 6. Test mascot hover
  console.log('6. Testing mascot hover...')
  const robustaCol = await page.$('[data-troupe="robusta"]')
  if (robustaCol) {
    await robustaCol.hover()
    await page.waitForTimeout(500)
    const isHovered = await robustaCol.evaluate(el => el.classList.contains('is-hovered'))
    results.push(`${isHovered ? '✅' : '❌'} Mascot hover: is-hovered class = ${isHovered}`)
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06-mascot-hover.png') })
    results.push('✅ Mascot hover screenshot saved')
  } else {
    results.push('❌ Robusta troupe column not found')
  }

  // 7. Test product popup modal
  console.log('7. Testing product popup modal...')
  // Click on robusta troupe to open modal
  if (robustaCol) {
    await robustaCol.click()
    await page.waitForTimeout(1000)

    // Check if modal is visible
    const modalOverlay = await page.$('.modal-overlay')
    const modalVisible = modalOverlay ? await modalOverlay.isVisible() : false
    results.push(`${modalVisible ? '✅' : '❌'} Product modal opened after click`)

    if (modalVisible) {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07-modal-menu.png') })
      results.push('✅ Modal menu screenshot saved')

      // Check if products are listed
      const productCards = await page.$$('.modal-card')
      results.push(`${productCards.length > 0 ? '✅' : '❌'} Product cards in modal: ${productCards.length} found`)

      // Check for "No products available" text
      const emptyText = await page.$('.modal-empty')
      results.push(`${!emptyText ? '✅' : '❌'} No "empty" message (products present)`)

      // 8. Click first product to see detail view
      if (productCards.length > 0) {
        console.log('8. Testing product detail view...')
        await productCards[0].click()
        await page.waitForTimeout(800)
        await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08-modal-detail.png') })
        results.push('✅ Product detail screenshot saved')

        // Check detail elements
        const detailName = await page.$('.modal-detail__name')
        const waButton = await page.$('a.btn--wa-green')
        results.push(`${detailName ? '✅' : '❌'} Product detail name visible`)
        results.push(`${waButton ? '✅' : '❌'} WhatsApp order button visible`)

        // 9. Test back button
        console.log('9. Testing back button...')
        const backBtn = await page.$('.modal-back')
        if (backBtn) {
          await backBtn.click()
          await page.waitForTimeout(500)
          const backToMenu = await page.$('.modal-menu-view')
          const menuVisible = backToMenu ? await backToMenu.isVisible() : false
          results.push(`${menuVisible ? '✅' : '❌'} Back button returns to menu`)
        }
      }

      // 10. Test close button
      console.log('10. Testing close button...')
      const closeBtn = await page.$('.modal-close')
      if (closeBtn) {
        await closeBtn.click()
        await page.waitForTimeout(500)
        const modalStillVisible = await page.$('.modal-overlay')
        results.push(`${!modalStillVisible ? '✅' : '❌'} Modal closed after clicking X`)
      } else {
        results.push('❌ Close button not found')
      }
    }
  }

  // 11. Test Arabica modal
  console.log('11. Testing Arabica modal...')
  const arabicaCol = await page.$('[data-troupe="arabica"]')
  if (arabicaCol) {
    await arabicaCol.click()
    await page.waitForTimeout(1000)
    const modalOverlay2 = await page.$('.modal-overlay')
    const modalVisible2 = modalOverlay2 ? await modalOverlay2.isVisible() : false
    results.push(`${modalVisible2 ? '✅' : '❌'} Arabica modal opened`)

    if (modalVisible2) {
      const arabicaCards = await page.$$('.modal-card')
      results.push(`${arabicaCards.length > 0 ? '✅' : '❌'} Arabica product cards: ${arabicaCards.length} found`)
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09-arabica-modal.png') })

      // Close it
      const closeBtn2 = await page.$('.modal-close')
      if (closeBtn2) await closeBtn2.click()
    }
  }

  // 12. Console errors check
  console.log('12. Checking console errors...')
  const consoleErrors = []
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  results.push(`${consoleErrors.length === 0 ? '✅' : '❌'} Console errors: ${consoleErrors.length}${consoleErrors.length > 0 ? ' — ' + consoleErrors.join('; ') : ''}`)

  // Print results
  console.log('\n========== VISUAL TEST RESULTS ==========')
  for (const r of results) console.log(r)
  console.log('==========================================')
  console.log(`\nScreenshots saved to: ${SCREENSHOTS_DIR}`)

  // List screenshot files
  const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png'))
  console.log(`Files: ${files.join(', ')}`)

  await browser.close()

  // Exit with error if any check failed
  const failed = results.filter(r => r.startsWith('❌'))
  if (failed.length > 0) {
    console.error(`\n${failed.length} CHECK(S) FAILED!`)
    process.exit(1)
  } else {
    console.log('\n✅ ALL CHECKS PASSED!')
    process.exit(0)
  }
}

run().catch(err => {
  console.error('Test failed:', err)
  process.exit(1)
})
