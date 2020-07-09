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
          total_task_points: 400,
        },
        {
          name: 'Sprint 1 - BackEnd',
          date_range: 10,
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 2,
          total_task_points: 400,
        },
        {
          name: 'Sprint 1 - Integração',
          date_range: 5,
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 2,
          total_task_points: 0,
        },
        {
          name: 'Sprint 1 - Criação do backend',
          date_range: 15,
          created_at: new Date('05-08-2020'),
          updated_at: new Date('05-08-2020'),
          team_id: 3,
          total_task_points: 500,
        },
        {
          name: 'Sprint 2 - Criação do frontend',
          date_range: 15,
          created_at: new Date('05-23-2020'),
          updated_at: new Date('05-23-2020'),
          team_id: 3,
          total_task_points: 500,
        },
        {
          name: 'Sprint 3 - Integração',
          date_range: 15,
          created_at: new Date('06-08-2020'),
          updated_at: new Date('06-08-2020'),
          team_id: 3,
          total_task_points: 500,
        },
        {
          name: 'Sprint 4 - Correções',
          date_range: 15,
          created_at: new Date('06-23-2020'),
          updated_at: new Date('06-23-2020'),
          team_id: 3,
          total_task_points: 500,
        },
        {
          name: 'Sprint 5 - Revisão',
          date_range: 5,
          created_at: new Date('07-07-2020'),
          updated_at: new Date('07-07-2020'),
          team_id: 3,
          total_task_points: 500,
        },
        {
          name: 'Sprint 6 - Conclusão',
          date_range: 5,
          created_at: new Date('07-12-2020'),
          updated_at: new Date('07-12-2020'),
          team_id: 3,
          total_task_points: 500,
        },
      ]);
   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('task_boards', null, {});
  }
};
