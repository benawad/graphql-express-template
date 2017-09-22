module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .addColumn('students', 'quizScores', {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      })
      .then(x =>
        queryInterface.sequelize.query(
          `
          update students set 
          "quizScores"[0] = "quizScore1", 
          "quizScores"[1] = "quizScore2", 
          "quizScores"[2] = "quizScore3"
          `
        ).then(x =>
          Promise.all([
            queryInterface.removeColumn('students', 'quizScore1'),
            queryInterface.removeColumn('students', 'quizScore2'),
            queryInterface.removeColumn('students', 'quizScore3'),
          ])
          )
      ),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
