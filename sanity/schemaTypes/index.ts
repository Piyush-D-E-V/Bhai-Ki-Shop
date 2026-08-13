import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryTypes'
import { productTypes } from './productTypes'
import { customerTypes } from './customerTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productTypes, customerTypes],
}
