module.exports = (sequelize, DataTypes) => {
  // 테이블명(comments)
  const AuthToken = sequelize.define(
    "AuthToken",
    {
      // id는 자동으로 설정됨
      payload: {
        type: DataTypes.STRING(10),
        // unique: true,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  AuthToken.associate = (db) => {};
  return AuthToken;
};
