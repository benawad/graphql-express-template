export default {
  Query: {
    allUsers: (parent, args, { models }) => models.User.findAll(),
    getUser: (parent, { username }, { models }) =>
      models.User.findOne({
        where: {
          username,
        },
      }),
  },

  Mutation: {
    createUser: (parent, args, { models }) => models.User.create(args),
    updateUser: (parent, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
  },
};
