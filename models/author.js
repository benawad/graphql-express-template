export default (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
  });

  Author.associate = (models) => {
    // many to many with book
    Author.belongsToMany(models.Book, {
      through: {
        model: models.BookAuthor,
      },
      foreignKey: 'authorId',
    });
  };

  return Author;
};
