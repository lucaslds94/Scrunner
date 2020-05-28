'use strict';

const today = new Date()
const YESTERDAY= new Date(today)

YESTERDAY.setDate(YESTERDAY.getDate() - 1)

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('daily_boards', 
      [
        {
          created_at: YESTERDAY,
          updated_at: YESTERDAY,
          team_id: 1,
        },
        {
          created_at: YESTERDAY,
          updated_at: YESTERDAY,
          team_id: 2,
        }
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('daily_boards', null, {});
  }
};
