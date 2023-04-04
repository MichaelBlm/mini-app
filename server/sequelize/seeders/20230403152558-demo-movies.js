"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("movies", [
      { title: "Mean Girls", createdAt: new Date(), updatedAt: new Date() },
      { title: "Hackers", createdAt: new Date(), updatedAt: new Date() },
      { title: "The Grey", createdAt: new Date(), updatedAt: new Date() },
      { title: "Sunshine", createdAt: new Date(), updatedAt: new Date() },
      { title: "Ex Machina", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("movies", null, {});
  },
};
