import { defineQuery } from "next-sanity";
import { LOW_STOCK_THRESHOLD } from "@/lib/constants/stock";

const PRODUCT_FILTER_CONDITION = `
  _type == "product"
  && ($categorySlug == "" || category->slug.current == $categorySlug)
  && ($color == "" || color == $color)  
  && ($material == "" || material == $material)
  && ($minPrice == 0 || price >= $minPrice)
  && ($maxPrice == 0 || price <= $maxPrice) 
  && ($searchQuery == "" || name match $searchQuery + "*" || description match $searchQuery + "*")
  && ($inStock == false || stock > 0)
`;

const FILTERED_PRODUCTS_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  price,
  "images": images[0...4] {
    _key,
    asset->{ _id, url }
  },
  category->{ _id, title, "slug": slug.current },
  material,
  color,
  stock,
  specifications
}`;

const RELEVANCE_SCORE = `score(
  boost(name match $searchQuery + "*", 3),
  boost(description match $searchQuery + "*", 1)
)`;

export const ALL_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "images": images[]{
    _key,
    asset->{ _id, url },
    hotspot
  },
  category->{ _id, title, "slug": slug.current },
  material,
  color,
  dimensions,
  stock,
  featured,
  assemblyRequired,
  specifications
}`);

export const FILTERED_PRODUCTS_QUERY = defineQuery(`*[
  ${PRODUCT_FILTER_CONDITION}
] | order(name asc)[0...6] ${FILTERED_PRODUCTS_PROJECTION}`);

export const LOW_STOCK_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && stock <= ${LOW_STOCK_THRESHOLD}
] | order(stock asc) {
  _id,
  name,
  "slug": slug.current,
  stock,
  "images": images[0] {
    asset->{ _id, url } 
  }
}`);

export const OUT_OF_STOCK_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && stock == 0
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  "images": images[0] {
    asset->{ _id, url } 
  }
}`);

export const AI_SEARCH_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product"
  && ($searchQuery == "" 
  || name match $searchQuery + "*" 
  || description match $searchQuery + "*" 
  || category->title match $searchQuery + "*")
  && ($categorySlug == "" || category->slug.current == $categorySlug)
  && ($material == "" || material == $material)
  && ($color == "" || color == $color)
  && ($minPrice == 0 || price >= $minPrice)
  && ($maxPrice == 0 || price <= $maxPrice)
] | ${RELEVANCE_SCORE} | order(_score desc)[0...20] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "images": images[0] {
    asset->{ _id, url }
  },
  category->{ _id, title, "slug": slug.current },
  material,
  color,
  stock,
  specifications
}`);

export const FEATURED_PRODUCTS_QUERY = defineQuery(`*[
  _type == "product" 
  && featured == true
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "images": images[] {
    _key,
    asset->{ _id, url },
    hotspot
  },
  category->{ _id, title, "slug": slug.current },
  specifications,
  stock
}`);

export const FILTER_PRODUCTS_BY_NAME_QUERY = defineQuery(`*[
  ${PRODUCT_FILTER_CONDITION}
] | order(name asc) ${FILTERED_PRODUCTS_PROJECTION}`);

export const FILTER_PRODUCTS_BY_PRICE_ASC_QUERY = defineQuery(`*[
  ${PRODUCT_FILTER_CONDITION}
] | order(price asc) ${FILTERED_PRODUCTS_PROJECTION}`);

export const FILTER_PRODUCTS_BY_PRICE_DESC_QUERY = defineQuery(`*[
  ${PRODUCT_FILTER_CONDITION}
] | order(price desc) ${FILTERED_PRODUCTS_PROJECTION}`);

export const FILTER_PRODUCTS_BY_RELEVANCE_QUERY = defineQuery(`*[
  ${PRODUCT_FILTER_CONDITION}
] | score(boost(name match $searchQuery + "*", 3), boost(description match $searchQuery + "*", 1)) | order(_score desc) ${FILTERED_PRODUCTS_PROJECTION}`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[
  _type == "product" && slug.current == $slug
][0] {
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  "images": images[] {
    _key,
    asset->{ _id, url },
    hotspot
  },
  category->{ _id, title, "slug": slug.current },
  material,
  color,
  dimensions,
  stock,
  featured,
  specifications
}`);

export const PRODUCT_BY_IDS_QUERY = defineQuery(`*[
  _type == "product" && _id in $ids
] {
  _id,
  name,
  "slug": slug.current,
  price,
  stock,
  "images": images[] {
    _key,
    asset->{ _id, url },
    hotspot
  },
  category->{ _id, title, "slug": slug.current }
}`);
