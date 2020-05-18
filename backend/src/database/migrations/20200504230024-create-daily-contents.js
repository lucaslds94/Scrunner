"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("daily_contents", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      did_yesterday: {
        type: Sequelize.STRING(255),
      },
      do_today: {
        type: Sequelize.STRING(255),
      },
      problems: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      daily_board_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "daily_boards", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("daily_contents");
  },
};
