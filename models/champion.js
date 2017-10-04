export default (sequelize, DataTypes) => {
  const Champion = sequelize.define('champion', {
    name: {
      type: DataTypes.STRING,
    },
    pictureUrl: {
      type: DataTypes.STRING,
    },
  });

  return Champion;
};
