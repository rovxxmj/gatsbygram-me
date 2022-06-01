module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // id
      content: {
        type: DataTypes.TEXT,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      charset: "utf8mb4", // 이모티콘 저장
      collate: "utf8mb4_general_ci",
      timestamps: true, // 생성, 수정, 삭제 일 기록
      underscored: false,
      paranoid: false,
      modelName: "Post",
      tableName: "posts",
    }
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Video);
    db.Post.hasMany(db.Comment);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
