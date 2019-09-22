export default `
type Category {
  id: ID!
  name: String
  slug: String
  label: String
  description: String
  createdAt: String
  updatedAt: String

  subCategories(limit: Int): [SubCategory]
  products(limit: Int): [Product]
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
  categories: [Category]
  category(inputCategory: InputCategory!): Category
}

extend type Mutation {
  createCategory(inputCreateCategory: InputCreateCategory!): Category
  updateCategory(categoryId: ID!, inputUpdateCategory: InputUpdateCategory!): Category
  deleteCategory(categoryId: ID!): Category
}
`;
