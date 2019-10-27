export default `
type OrderDetail {
  id: ID!
  productId: ID!
  orderId: ID!
  quantity: Int!
  totalPrice: Int!
  note: String
  createdAt: Date
  updatedAt: Date

  product: Product
}

type Order {
  id: ID!
  customerId: ID!
  code: String
  totalPrice: Int!
  address: String
  createdAt: Date
  updatedAt: Date

  customer: Customer
  orderDetails(limit: Int): [OrderDetail]
}

type OrderConnection {
  edges: [Order]
  pageInfo: PageInfo!
  totalCount: Int!
}

input InputOrders {
  first: Int
  offset: Int
}

input InputCreateOrderDetail {
  productId: ID!
  quantity: Int!
  totalPrice: Int!
  note: String
}

input InputCreateOrder {
  customerId: ID!
  code: String!
  totalPrice: Int!
  address: String
  orderDetails: [InputCreateOrderDetail]!
}

input InputOrder {
  orderId: ID!
}

extend type Query {
  orders(inputOrders: InputOrders): OrderConnection
  order(inputOrder: InputOrder!): Order
}

extend type Mutation {
  createOrder(inputCreateOrder: InputCreateOrder!): Order
}
`;
