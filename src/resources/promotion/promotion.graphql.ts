export default `
type Promotion {
  id: ID!
  productId: ID!
  order: Int!
  createdAt: Date
  updatedAt: Date
}

input InputSynchronizePromotion {
  productId: ID!
  order: Int!
}

input InputCreatePromotion {
  productId: ID!
  order: Int!
}

input InputUpdatePromotion {
  productId: ID
  order: Int
}

input InputDeletePromotion {
  productId: ID!
}

extend type Query {
  promotions: [Product]
}

extend type Mutation {
  synchronizePromotion(inputSynchronizePromotion: [InputSynchronizePromotion]!): [Promotion]
  createPromotion(inputCreatePromotion: InputCreatePromotion!): Promotion
  updatePromotion(inputUpdatePromotion: InputUpdatePromotion!): Promotion
  deletePromotion(inputDeletePromotion: InputDeletePromotion!): Promotion
}
`;
