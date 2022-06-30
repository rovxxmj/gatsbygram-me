module.exports = (sequelize, DataTypes) => {
  // 테이블명(comments)
  const Comment = sequelize.define(
    "Comment",
    {
      // id는 자동으로 설정됨
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsToMany(db.Comment, {
      through: "Reply",
      as: "Replying",
      foreignKey: "RepliedId",
    });
    db.Comment.belongsToMany(db.Comment, {
      through: "Reply",
      as: "Replied",
      foreignKey: "ReplyingId",
    });
  };
  return Comment;
};
