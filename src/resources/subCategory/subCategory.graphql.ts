export default `
type SubCategory {
  id: ID!
  categoryId: ID
  name: String
  slug: String
  label: String
  description: String
  createdAt: String
  updatedAt: String

  category: Category
  products(limit: Int): [Product]
}

input NewSubCategory {
  name: String!
  label: String
  description: String
}

input UpdateSubCategory {
  label: String
  description: String
}

input InputSubCategory {
  subCategoryId: ID
  subCategorySlug: String
}

extend type Query {
  subCategories: [SubCategory]
  subCategory(inputSubCategory: InputSubCategory!): SubCategory
}

extend type Mutation {
  createSubCategory(categoryId: ID!, input: NewSubCategory!): SubCategory
  updateSubCategory(subCategoryId: ID!, input: UpdateSubCategory!): SubCategory
  deleteSubCategory(subCategoryId: ID!): SubCategory
}
`;
