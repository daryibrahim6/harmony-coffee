import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { importMap } from '../importMap.js'

export const generateMetadata = async () => {
  return {
    title: 'Not Found - D\'Harmony Admin',
  }
}

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = ({ params, searchParams }: Args) => {
  return NotFoundPage({ config: configPromise, importMap, params, searchParams })
}

export default NotFound
