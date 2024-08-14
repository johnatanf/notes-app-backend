"use strict";

const { UserAccount } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await UserAccount.bulkCreate(
      [
        {
          id: 1,
          full_name: "User 1",
          username: "user1",
          email: "user1@notesapp.com",
          password_hash: "123456",
          profile_img_url: "",
          password_reset_token: "",
          last_login: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          full_name: "User 2",
          username: "user2",
          email: "user2@notesapp.com",
          password_hash: "abcdef",
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

    // reset postgresql sequence after seeding
    await queryInterface.sequelize.query(
      `SELECT setval('"UserAccounts_id_seq"', (SELECT MAX(id) FROM "UserAccounts"), true);`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("UserAccount", null, {});
  },
};
