import { defineField, defineType } from 'sanity'

export const reviewTypes = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      description: 'The product being reviewed.',
      validation: (Rule) => Rule.required().error('A review must be linked to a product.'),
    }),
    defineField({
      name: 'userId',
      title: 'Clerk User ID',
      type: 'string',
      description: 'The unique authentication ID from Clerk.',
      validation: (Rule) => Rule.required(),
      readOnly: true, // Prevents manual editing in the studio to maintain data integrity
    }),
    defineField({
      name: 'userName',
      title: 'User Name',
      type: 'string',
      description: 'The display name of the reviewer.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Star rating from 1 to 5.',
      validation: (Rule) => Rule.required().min(1).max(5).error('Rating must be strictly between 1 and 5.'),
    }),
    defineField({
      name: 'comment',
      title: 'Review Comment',
      type: 'text',
      description: 'The written feedback provided by the customer.',
      validation: (Rule) => Rule.max(1000).error('Comments cannot exceed 1000 characters.'),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'userName',
      productName: 'product.name', // Adjust 'name' if your product schema uses a different title field
      rating: 'rating',
    },
    prepare({ title, productName, rating }) {
      return {
        title: `${title} (${rating} Stars)`,
        subtitle: productName ? `Product: ${productName}` : 'No product linked',
      }
    },
  },
})