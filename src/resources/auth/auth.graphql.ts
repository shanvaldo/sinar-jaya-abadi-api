export default `
type Authentication {
  status: Boolean,
  accessToken: String,
  refreshToken: String,
}

input InputLogin {
  username: String!
  password: String!
}

input InputRefreshToken {
  username: String!
  refreshToken: String!
}

extend type Mutation {
  login(inputLogin: InputLogin!): Authentication
  refreshToken(inputRefreshToken: InputRefreshToken!): Authentication
}
`;
