'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('daily_boards', 
      [
        {
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 1,
        },
        {
          created_at: new Date(),
          updated_at: new Date(),
          team_id: 2,
        }
      ]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('daily_boards', null, {});
  }
};
