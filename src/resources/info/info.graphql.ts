export default `
type Info {
  id: ID!

  companyName: String
  street: String
  city: String
  state: String
  postCode: String
  phones: [String]
  emails: [String]
  facebook: String
  twitter: String
  instagram: String
  linkedIn: String

  createdAt: Date
  updatedAt: Date
}

input InputSynchronizeInfo {
  companyName: String!
  street: String
  city: String
  state: String
  postCode: String
  phones: [String]!
  emails: [String]!
  facebook: String
  twitter: String
  instagram: String
  linkedIn: String
}

extend type Query {
  info: Info
}

extend type Mutation {
  synchronizeInfo(inputSynchronizeInfo: InputSynchronizeInfo!): Boolean
}
`;
