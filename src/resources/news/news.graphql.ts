export default `
type News {
  id: ID!
  title: String
  content: String
  coverImage: String
  createdAt: String
  updatedAt: String
}

input InputNewsDetail {
  newsId: ID!
}

input InputCreateNews {
  title: String!
  content: String
  coverImage: String
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
  news: [News]
  newsDetail(inputNewsDetail: InputNewsDetail!): News
}

extend type Mutation {
  createNews(inputCreateNews: InputCreateNews!): News
  updateNews(inputUpdateNews: InputUpdateNews!): News
  deleteNews(inputDeleteNews: InputDeleteNews!): News
}
`;
