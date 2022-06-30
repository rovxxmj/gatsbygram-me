module.exports = (sequelize, DataTypes) => {
  // 테이블명(Mention)
  const Mention = sequelize.define(
    "Mention",
    {
      // id는 자동으로 설정됨
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Mention.associate = (db) => {
    db.Mention.belongsTo(db.Post);
    db.Mention.belongsToMany(db.User, {
      through: "UserMention",
      as: "Mentioning",
    });
  };
  return Mention;
};
