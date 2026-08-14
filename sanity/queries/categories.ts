import { defineQuery } from "next-sanity";

/* Get all categories
 * Used for Navigation and filters
 */
export const ALL_CATEGORIES_QUERY = defineQuery(`*[
  _type == "category"
] | order(title asc) {
  _id,
  title,
  "slug": slug.current,
  "image": image {
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);

/* Get a specific category by its slug
 * Used for category detail pages
 */
export const CATEGORY_BY_SLUG_QUERY = defineQuery(`*[
  _type == "category"
  && slug.current == $slug
][0] {
  _id,
  title,
  "slug": slug.current,
  "image": image {
    asset->{
      _id,
      url
    },
    hotspot
  }
}`);