"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Note.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserAccount",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.TEXT,
      },
      archived: {
        type: DataTypes.BOOLEAN,
      },
      pinned: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Note",
    }
  );
  return Note;
};
