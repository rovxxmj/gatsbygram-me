module.exports = (sequelize, DataTypes) => {
  // 테이블명(hashtags)
  const Hashtag = sequelize.define(
    "Hashtag",
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
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
