export default (sequelize, DataTypes) => {
  const Champion = sequelize.define('champion', {
    name: {
      type: DataTypes.STRING,
    },
    publicId: {
      type: DataTypes.STRING,
    },
  });

  return Champion;
};
