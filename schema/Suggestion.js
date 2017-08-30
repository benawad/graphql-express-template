export const types = `
  type Suggestion {
    id: Int!
    text: String!
    creator: User!
  }
`;

export const queries = `
  userSuggestions(creatorId: String!): [Suggestion!]!
  suggestions: [Suggestion!]!
  someSuggestions(limit: Int!, offset: Int!): [Suggestion!]!
  someSuggestions2(limit: Int!, cursor: Int): [Suggestion!]!
  searchSuggestions(query: String!, limit: Int!, cursor: Int): [Suggestion!]!
`;

export const mutations = `
  createSuggestion(creatorId: Int!, text: String, boardId: Int!): Suggestion!
`;
