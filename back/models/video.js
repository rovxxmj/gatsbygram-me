module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "Video",
    {
      // id
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      underscored: false,
      paranoid: false,
      modelName: "Video",
      tableName: "videos",
    }
  );

  Video.associate = (db) => {
    db.Video.belongsTo(db.Post);
  };
  return Video;
};
