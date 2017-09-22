export default (sequelize, DataTypes) => {
  const Student = sequelize.define('student', {
    quizScores: DataTypes.ARRAY(DataTypes.INTEGER),
  });

  return Student;
};
