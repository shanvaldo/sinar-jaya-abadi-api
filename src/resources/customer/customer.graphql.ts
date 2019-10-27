export default `
type Customer {
  id: ID!
  email: String
  fullName: String
  phone: String
  createdAt: Date
  updatedAt: Date

  orders(limit: Int): [Order]
}

type CustomerConnection {
  edges: [Customer]
  pageInfo: PageInfo!
  totalCount: Int!
}

input InputCreateCustomer {
  email: String
  fullName: String!
  phone: String!
}

input InputCustomer {
  customerId: ID!
}

extend type Query {
  customers(first: Int, offset: Int): CustomerConnection
  customer(inputCustomer: InputCustomer!): Customer
}

extend type Mutation {
  createCustomer(inputCreateCustomer: InputCreateCustomer!): Customer
  deleteCustomer(customerId: ID!): Customer
}
`;
