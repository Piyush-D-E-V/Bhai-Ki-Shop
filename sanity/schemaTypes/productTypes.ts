import { PackageIcon } from "@sanity/icons/Package";

import { defineField, defineType } from "sanity";
// import { MATERIALS_SANITY_LIST, COLORS_SANITY_LIST } from "@/lib/constants/filters";

export const productTypes = defineField({
  name: "Product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  group: [
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
      title: "slug",
      group: "details",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
        name: "description",
        title: "text",
        group: "details",
        rows: 4,
        description: "Product Description"
    }),
    defineField({
        name: "price",
        title: "number",
        group: "details",
        description: "Price in GBP (e.g., 599.99)",
        
    })
  ],
});
