import { PackageIcon } from "@sanity/icons/Package";
import { defineField, defineType } from "sanity";
import {
  MATERIALS_SANITY_LIST,
  COLORS_SANITY_LIST,
} from "@/lib/constants/filters";

export const productTypes = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media" },
    { name: "inventory", title: "Inventory" },
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "details",
      validation: (rule) => [rule.required().error("Details are Required")],
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => [
        rule.required().error("Slug is required for URL generation"),
      ],
    }),
    defineField({
      name: "description",
      type: "text",
      group: "details",
      rows: 4,
      description: "Product Description",
    }),
    defineField({
      name: "price",
      type: "number",
      group: "details",
      description: "Price in GBP (e.g., 599.99)",
      validation: (rule) => [
        rule.required().error("Price is required for the product"),
        rule.positive().error("Price must be a positive number "),
      ],
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "details",
      validation: (rule) => [rule.required().error("Category is required")],
    }),
    defineField({
      name: "specifications",
      title: "Technical Specifications",
      type: "array",
      group: "details",
      description:
        "Add specific features for AI comparison (e.g., DPI, Refresh Rate, Switches)",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "key",
              title: "Feature Name",
              type: "string",
              description: 'e.g., "Polling Rate", "Panel Type", "Switch Type"',
              validation: (rule) => rule.required(),
            },
            {
              name: "value",
              title: "Value",
              type: "string",
              description: 'e.g., "8000Hz", "IPS", "Cherry MX Red"',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              title: "key",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    defineField({
      name: "materials",
      type: "string",
      group: "details",
      options: { list: MATERIALS_SANITY_LIST, layout: "radio" },
    }),
    defineField({
      name: "color",
      type: "string",
      group: "details",
      options: {
        list: COLORS_SANITY_LIST,
        layout: "radio",
      },
    }),
    defineField({
      name: "images",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (rule) => [
        rule.min(1).error("At least one image is required"),
      ],
    }),
    defineField({
      name: "stock",
      type: "number",
      group: "inventory",
      description: "Number of items in stock",
      validation: (rule) => [
        rule.min(0).error("Stock can not be negative"),
        rule.integer().error("stock must be in integer numbers"),
      ],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Show on homepage and promotions",
    }),
    defineField({
      name: "assemblyRequired",
      type: "boolean",
      group: "inventory",
      initialValue: false,
      description: "Does this product require assembly?",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.title",
      media: "images.0",
      price: "price",
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: `${subtitle ? subtitle + " • " : ""}$${price ?? 0}`,
        media,
      };
    },
  },
});
