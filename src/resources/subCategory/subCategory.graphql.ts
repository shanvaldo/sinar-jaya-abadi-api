export default `
type SubCategory {
  id: ID!
  categoryId: ID
  name: String
  slug: String
  label: String
  description: String
  createdAt: Date
  updatedAt: Date

  category: Category
  products(limit: Int, offset: Int, sort: InputProductSort): [Product]
}

input InputCreateSubCategory {
  name: String!
  categoryId: ID!
  label: String
  description: String
}

type SubCategoryConnection {
  edges: [SubCategory]
  pageInfo: PageInfo!
  totalCount: Int!
}

input InputSubCategories {
  first: Int
  offset: Int
}

input InputUpdateSubCategory {
  label: String
  description: String
}

input InputSubCategory {
  subCategoryId: ID
  subCategorySlug: String
}

extend type Query {
  subCategories(inputSubCategories: InputSubCategories): SubCategoryConnection
  subCategory(inputSubCategory: InputSubCategory!): SubCategory
}

extend type Mutation {
  createSubCategory(inputCreateSubCategory: InputCreateSubCategory!): SubCategory
  updateSubCategory(subCategoryId: ID!, inputUpdateSubCategory: InputUpdateSubCategory!): SubCategory
  deleteSubCategory(subCategoryId: ID!): SubCategory
}
`;
