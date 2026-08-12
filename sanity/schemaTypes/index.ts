import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType],
}
