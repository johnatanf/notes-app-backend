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
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [6, Infinity],
            msg: "Username must be at least 6 characters long.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, Infinity],
            msg: "Password must be at least 6 characters long.",
          },
        },
      },
      profile_img_url: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      password_reset_token: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      last_login: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "UserAccount",
      hooks: {
        beforeCreate: async (userAccount) => {
          try {
            if (userAccount.password_hash) {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(
                userAccount.password_hash,
                salt
              );
              userAccount.password_hash = hashedPassword;
            }
          } catch (error) {
            console.error("Error in beforeCreate hook:", error);
          }
        },
      },
    }
  );

  // Method to compare passwords
  UserAccount.prototype.validPassword = async function (password_hash) {
    return await bcrypt.compare(password_hash, this.password_hash);
  };

  return UserAccount;
};
