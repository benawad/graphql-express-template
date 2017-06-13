export default `
  type User {
    id: Int!
    username: String!
    createdAt: String!
    updatedAt: String! 
  }

  type Query {
    allUsers: [User!]!
    getUser(username: String!): User
  }

  type Mutation {
    createUser(username: String!): User
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(username: String!): Int!
  }
`;
