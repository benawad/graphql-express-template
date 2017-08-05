export default {
  Query: {
    fields: {
      getBook: {
        where: (table, empty, args) => `${table}.id = ${args.id}`,
      },
      allBooks: {
        limit: (table, { limit }) => limit,
        orderBy: 'id',
        where: (table, empty, { key }) => `${table}.id > ${key}`,
      },
    },
  },
  Author: {
    sqlTable: 'authors',
    uniqueKey: 'id',
    fields: {
      books: {
        junction: {
          sqlTable: '"bookAuthors"',
          include: {
            primary: {
              sqlColumn: 'primary',
            },
          },
          sqlJoins: [
            (authorTable, junctionTable) => `${authorTable}.id = ${junctionTable}."authorId"`,
            (junctionTable, bookTable) => `${junctionTable}."bookId" = ${bookTable}.id`,
          ],
        },
      },
    },
  },
  Book: {
    sqlTable: 'books',
    uniqueKey: 'id',
    fields: {
      authors: {
        junction: {
          sqlTable: '"bookAuthors"',
          include: {
            primary: {
              sqlColumn: 'primary',
            },
          },
          sqlJoins: [
            (bookTable, junctionTable) => `${bookTable}.id = ${junctionTable}."bookId"`,
            (junctionTable, authorTable) => `${junctionTable}."authorId" = ${authorTable}.id`,
          ],
        },
      },
    },
  },
};
