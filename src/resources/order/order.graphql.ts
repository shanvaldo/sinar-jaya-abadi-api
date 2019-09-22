export default `
type OrderDetail {
  id: ID!
  productId: ID!
  orderId: ID!
  quantity: Int!
  totalPrice: Int!
  note: String
  createdAt: String
  updatedAt: String

  product: Product
}

type Order {
  id: ID!
  customerId: ID!
  totalPrice: Int!
  createdAt: String
  updatedAt: String

  customer: Customer
  orderDetails: [OrderDetail]
}

input InputCreateOrderDetail {
  productId: ID!
  quantity: Int!
  totalPrice: Int!
  note: String
}

input InputCreateOrder {
  customerId: ID!
  totalPrice: Int!
  orderDetails: [InputCreateOrderDetail]!
}

input InputOrder {
  orderId: ID!
}

extend type Query {
  orders: [Order]
  order(inputOrder: InputOrder!): Order
}

extend type Mutation {
  createOrder(inputCreateOrder: InputCreateOrder!): Order
}
`;
