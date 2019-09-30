export default `
type ProductImage {
  id: ID!
  productId: ID
  linkImage: String
  order: Int
  createdAt: Date
  updatedAt: Date
}

type Product {
  id: ID!
  name: String
  slug: String
  description: String
  subCategoryId: ID
  categoryId: ID
  sold: Int
  seen: Int
  isAvailable: Boolean
  minOrder: Int
  price: Int
  createdAt: Date
  updatedAt: Date

  category: Category
  productImages: [ProductImage]
  subCategory: SubCategory
}

type ProductConnection {
  edges: [Product]
  pageInfo: PageInfo!
  totalCount: Int!
}

input InputProductSort {
  name: SortBy
  seen: SortBy
  createdAt: SortBy
}

input InputProducts {
  first: Int
  offset: Int
  sort: InputProductSort
}

input InputProductImage {
  linkImage: String!
  order: Int!
}

input InputCreateProduct {
  name: String!
  description: String
  categoryId: ID!
  subCategoryId: ID
  isAvailable: Boolean
  minOrder: Int
  price: Int!
  productImages: [InputProductImage]
}

input InputUpdateProduct {
  name: String
  description: String
  categoryId: ID
  subCategoryId: ID
  isAvailable: Boolean
  minOrder: Int
  price: Int
  productImages: [InputProductImage]
}

input InputProduct {
  productId: ID!
  productSlug: String
}

input InputSearchProduct {
  name: String!
}

input InputRecommendationProduct {
  productId: ID!
  categoryId: ID!
  limit: Int
}

extend type Query {
  products(inputProducts: InputProducts): ProductConnection
  product(inputProduct: InputProduct!): Product
  searchProducts(inputSearchProduct: InputSearchProduct!): [Product]
  recommendationProducts(inputRecommendationProduct: InputRecommendationProduct): [Product]
}

extend type Mutation {
  createProduct(inputCreateProduct: InputCreateProduct!): Product
  updateProduct(productId: ID!, inputUpdateProduct: InputUpdateProduct!): Product
  deleteProduct(productId: ID!): Product
  incrementSeen(productId: ID!): Boolean
}
`;
