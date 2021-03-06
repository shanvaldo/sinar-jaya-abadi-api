export default `
type Query {
  appName: String!
}

type Mutation {
  setAppName: String!
  clearCache: Boolean
}

scalar Date

type PageInfo {
  currentPage: Int
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  totalPage: Int
}

enum SortBy {
  # Sort Ascending
  ASC
  # Sort Descending
  DESC
}
`;
