"use strict";

const { Note } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Note.bulkCreate(
      [
        {
          id: 1,
          user_account_id: 1,
          title: "Note 1",
          text: "Note 1 description",
          archived: false,
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          user_account_id: 1,
          title: "Note 2",
          text: "Note 2 description",
          archived: false,
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          user_account_id: 1,
          title: "Note 3",
          text: "Note 3 description",
          archived: false,
          pinned: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          user_account_id: 2,
          title: "Note 4",
          text: "Note 4 description",
          archived: false,
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          user_account_id: 2,
          title: "Note 5",
          text: "Note 5 description",
          archived: false,
          pinned: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Note", null, {});
  },
};
