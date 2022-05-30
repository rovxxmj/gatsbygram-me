module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      // id
      content: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
