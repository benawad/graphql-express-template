export default `

  type Subscription {
    userAdded: User!
  }

  type Suggestion {
    id: Int!
    text: String!
    creator: User!
  }

  type Board {
    id: Int!
    name: String!
    suggestions: [Suggestion!]!
    owner: Int!
  }

  type User {
    id: Int!
    username: String
    createdAt: String!
    updatedAt: String! 
    boards: [Board!]!
    suggestions: [Suggestion!]!
    isAdmin: Boolean!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type Query {
    allUsers: [User!]!
    me: User
    userBoards(owner: Int!): [Board!]!
    userSuggestions(creatorId: String!): [Suggestion!]!
  }

  type Mutation {
    updateUser(username: String!, newUsername: String!): [Int!]!
    deleteUser(username: String!): Int!
    createBoard(owner: Int!, name: String): Board!
    createSuggestion(creatorId: Int!, text: String, boardId: Int!): Suggestion!
    register(username: String!, email: String!, password: String!, isAdmin: Boolean): User!
    login(email: String!, password: String!): AuthPayload!
    createUser(username: String!): User!
    refreshTokens(token: String!, refreshToken: String!): AuthPayload!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
