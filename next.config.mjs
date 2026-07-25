import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['sharp', '@libsql/client', 'libsql', '@payloadcms/db-sqlite'],
  images: {
    formats: ['image/webp'],
  },
}

export default withPayload(nextConfig)
