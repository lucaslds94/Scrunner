"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      task_points: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      task_columns_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "task_columns", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      task_boards_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "task_boards", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tasks");
  },
};
