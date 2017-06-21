export default {
  '{\n  allUsers {\n    id\n    username\n    __typename\n  }\n}\n': 1,
  'mutation ($username: String!) {\n  createUser(username: $username) {\n    id\n    username\n    __typename\n  }\n}\n': 2,
};
