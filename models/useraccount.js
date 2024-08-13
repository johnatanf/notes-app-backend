"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class UserAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Note, { foreignKey: "user_account_id" });
    }
  }
  UserAccount.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      profile_img_url: {
        type: DataTypes.STRING,
      },
      password_reset_token: {
        type: DataTypes.STRING,
      },
      last_login: {
        type: DataTypes.DATE,
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
      modelName: "UserAccount",
      hooks: {
        beforeCreate: async (userAccount) => {
          try {
            if (userAccount.password) {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(
                userAccount.password,
                salt
              );
              userAccount.password = hashedPassword;
            }
          } catch (error) {
            console.error("Error in beforeCreate hook:", error);
          }
        },
      },
    }
  );

  // Method to compare passwords
  UserAccount.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return UserAccount;
};
