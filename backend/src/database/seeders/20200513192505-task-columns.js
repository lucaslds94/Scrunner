'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('task_columns', 
      [
        {
          name: 'To do',
        },
        {
          name: 'Doing',
        },
        {
          name: 'Done',
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('task_columns', null, {});
  }
};
