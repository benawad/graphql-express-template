export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      fbId: DataTypes.BIGINT(20),
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
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
