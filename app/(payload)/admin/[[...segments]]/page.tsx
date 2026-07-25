import type { NextRequest } from 'next/server'
import { RootPage } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { importMap } from '../importMap.js'

export const generateMetadata = async () => {
  return {
    title: 'D\'Harmony Admin',
  }
}

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const Page = ({ params, searchParams }: Args) => {
  return RootPage({ config: configPromise, importMap, params, searchParams })
}

export default Page
