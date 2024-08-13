"use strict";

const { UserAccount } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserAccount.bulkCreate(
      [
        {
          full_name: "User 1",
          username: "user1",
          email: "user1@notesapp.com",
          password: "123456",
          profile_img_url: "",
          password_reset_token: "",
          last_login: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: "User 2",
          username: "user2",
          email: "user2@notesapp.com",
          password: "abcdef",
          profile_img_url: "",
          password_reset_token: "",
          last_login: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        individualHooks: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserAccount", null, {});
  },
};
