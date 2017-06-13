export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
  });

  return User;
};
