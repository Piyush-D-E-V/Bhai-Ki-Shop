import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryTypes'
import { productTypes } from './productTypes'
import { orderType } from './orderTypes'
import { customerTypes } from './customerTypes'
import { reviewTypes } from './reviewTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productTypes, orderType, customerTypes, reviewTypes ],
}
