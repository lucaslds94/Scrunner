'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('task_boards', 
      [
        {
          name: ' Sprint 1 - FrontEnd',
          date_range: 15,
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 1,
        },
        {
          name: 'Sprint 1 - BackEnd',
          date_range: 10,
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 2,
        },
        {
          name: 'Sprint 1 - Integração',
          date_range: 5,
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
