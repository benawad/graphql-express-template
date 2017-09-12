const books = require('./bookData');

module.exports = {
  up: (queryInterface) => {
    const booksWithDates = books.map(b => ({
      title: b.title,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return queryInterface.bulkInsert('books', booksWithDates);
  },

  down: () => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
