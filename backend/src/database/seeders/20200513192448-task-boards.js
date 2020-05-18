'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('task_boards', 
      [
        {
          name: ' Sprint 1 - FrontEnd',
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 1,
        },
        {
          name: 'Sprint 1 - BackEnd',
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 2,
        }
      ]);
   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('task_boards', null, {});
  }
};
