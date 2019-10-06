export default `
type Category {
  id: ID!
  name: String
  slug: String
  label: String
  description: String
  createdAt: Date
  updatedAt: Date

  subCategories(limit: Int): [SubCategory]
  products(limit: Int): [Product]
}

type CategoryConnection {
  edges: [Category]
  pageInfo: PageInfo!
  totalCount: Int!
}

input InputCreateCategory {
  name: String!
  label: String
  description: String
}

input InputUpdateCategory {
  label: String
  description: String
}

input InputCategory {
  categoryId: ID
  categorySlug: String
}

extend type Query {
  categories(first: Int, offset: Int): CategoryConnection
  category(inputCategory: InputCategory!): Category
}

extend type Mutation {
  createCategory(inputCreateCategory: InputCreateCategory!): Category
  updateCategory(categoryId: ID!, inputUpdateCategory: InputUpdateCategory!): Category
  deleteCategory(categoryId: ID!): Category
}
`;
