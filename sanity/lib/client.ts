import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// 1. The READ client (for fetching products, categories, etc.)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// 2. The WRITE client (for creating orders, updating stock, etc.)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for mutations
  token: process.env.SANITY_API_TOKEN, // Make sure you have this in your .env file!
})