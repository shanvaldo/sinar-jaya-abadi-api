export default `
type News {
  id: ID
  title: String
  content: String
  coverImage: String
  createdAt: Date
  updatedAt: Date

  nextNewsId: ID
  previousNewsId: ID

  nextNews: News
  previousNews: News
}

type NewsConnection {
  edges: [News]
  pageInfo: PageInfo!
  totalCount: Int!
}

input InputNews {
  first: Int
  offset: Int
  sortByCreatedAt: SortBy
}

input InputNewsDetail {
  newsId: ID!
}

input InputCreateNews {
  title: String!
  content: String
  coverImage: String!
}

input InputUpdateNews {
  newsId: ID!
  title: String
  content: String
  coverImage: String
}

input InputDeleteNews {
  newsId: ID!
}

extend type Query {
  news(inputNews: InputNews): NewsConnection
  newsDetail(inputNewsDetail: InputNewsDetail!): News
}

extend type Mutation {
  createNews(inputCreateNews: InputCreateNews!): News
  updateNews(inputUpdateNews: InputUpdateNews!): News
  deleteNews(inputDeleteNews: InputDeleteNews!): News
}
`;
