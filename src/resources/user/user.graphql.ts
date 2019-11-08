export default `
type User {
  id: ID!
  username: String
  password: String
  createdAt: Date
  updatedAt: Date
}

input NewUser {
  username: String
  password: String
}

extend type Query {
  users: [User]
  user(userId: ID!): User
}

extend type Mutation {
  createUser(input: NewUser!): User
  deleteUser(userId: ID!): User
}
`;
