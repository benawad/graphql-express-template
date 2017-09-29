export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fbId: DataTypes.BIGINT(),
      username: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          len: {
            args: [5, 10],
            msg: "Username needs to be between 5 and 10 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      refreshSecret: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      indexes: [
        {
          fields: ['"fbId"'],
        },
      ],
    },
  );

  User.associate = (models) => {
    // 1 to many with board
    User.hasMany(models.Board, {
      foreignKey: 'owner',
    });
    // 1 to many with suggestion
    User.hasMany(models.Suggestion, {
      foreignKey: 'creatorId',
    });
  };

  return User;
};
