"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("UserAccounts", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, Infinity],
            msg: "Password must be at least 6 characters long.",
          },
        },
      },
      profile_img_url: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      password_reset_token: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      last_login: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("UserAccounts");
  },
};
