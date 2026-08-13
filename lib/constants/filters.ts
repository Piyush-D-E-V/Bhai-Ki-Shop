export const COLORS = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "silver", label: "Silver" },
  { value: "rgb", label: "RGB" },
] as const;

export const MATERIALS = [
  { value: "aluminum", label: "Aluminum" },
  { value: "pbt-plastic", label: "Pbt-plastic" },
  { value: "wood", label: "Wood" },
] as const;

export const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "relevance", label: "Relevance" },
] as const;

export type ColorValue = (typeof COLORS)[number]["value"];
export type MaterialsValue = (typeof MATERIALS)[number]["value"];
export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const COLORS_SANITY_LIST = COLORS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const MATERIALS_SANITY_LIST = MATERIALS.map(({ value, label }) => ({
  title: label,
  value,
}));

export const COLOR_VALUES = COLORS.map((c) => c.value) as [
  ColorValue,
  ...ColorValue[],
];

export const MATERIAL_VALUES = MATERIALS.map((c) => c.value) as [
  MaterialsValue,
  ...MaterialsValue[],
];
