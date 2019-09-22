export default `
type Customer {
  id: ID!
  email: String
  fullName: String
  phone: String
  address: String
  createdAt: String
  updatedAt: String
}

input InputCreateCustomer {
  email: String
  fullName: String!
  phone: String
  address: String
}

extend type Query {
  customers: [Customer]
  customer(customerId: ID!): Customer
}

extend type Mutation {
  createCustomer(inputCreateCustomer: InputCreateCustomer!): Customer
  deleteCustomer(customerId: ID!): Customer
}
`;
