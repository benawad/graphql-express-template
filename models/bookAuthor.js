export default (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('bookAuthor', {
    primary: {
      type: DataTypes.BOOLEAN,
    },
  });

  return BookAuthor;
};
