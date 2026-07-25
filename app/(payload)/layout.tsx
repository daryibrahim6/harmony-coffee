import { importMap } from './admin/importMap.js'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { handleServerFunctions } from '@payloadcms/next/layouts'

import './custom.scss'

export const metadata = {
  title: 'D\'Harmony Admin',
}

type Args = {
  children: React.ReactNode
}

export default function PayloadLayout({ children }: Args) {
  return RootLayout({
    children,
    config: Promise.resolve(config),
    importMap,
    serverFunction: handleServerFunctions as unknown as Parameters<typeof RootLayout>[0]['serverFunction'],
  })
}
