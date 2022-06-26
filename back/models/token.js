module.exports = (sequelize, DataTypes) => {
  // 테이블명(comments)
  const Token = sequelize.define(
    "Token",
    {
      // id는 자동으로 설정됨
      payload: {
        type: DataTypes.STRING(10),
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Token.associate = (db) => {
    db.Token.belongsTo(db.User);
  };
  return Token;
};
