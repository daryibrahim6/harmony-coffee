import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Products } from './features/products/schema/products'
import { ProductGroups } from './features/products/schema/productGroups'
import { Testimonials } from './features/home/schema/testimonials'
import { Standards } from './features/home/schema/standards'
import { Media } from './features/media/schema/media'
import { Users } from './features/auth/schema/users'
import { SiteSettings } from './features/home/schema/siteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- D\'Harmony Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname, 'app/(payload)'),
    },
  },
  collections: [Products, ProductGroups, Testimonials, Standards, Media, Users],
  globals: [SiteSettings],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || (process.env.VERCEL ? 'file:/tmp/dharmony.db' : `file:${path.resolve(dirname, 'dharmony.db')}`),
    },
  }),
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
