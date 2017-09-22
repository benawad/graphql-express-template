module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('students', 'testScore1', 'quizScore1'),
      queryInterface.renameColumn('students', 'testScore2', 'quizScore2'),
      queryInterface.renameColumn('students', 'testScore3', 'quizScore3'),
    ]);
  },

  down: (queryInterface, Sequelize) => [
    queryInterface.renameColumn('students', 'quizScore1', 'testScore1'),
    queryInterface.renameColumn('students', 'quizScore2', 'testScore2'),
    queryInterface.renameColumn('students', 'quizScore3', 'testScore3'),
  ],
};
