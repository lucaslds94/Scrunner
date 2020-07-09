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
        },
        {
          created_at: new Date('05-08-2020'),
          updated_at: new Date('05-08-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('05-16-2020'),
          updated_at: new Date('05-16-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('05-24-2020'),
          updated_at: new Date('05-24-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('06-02-2020'),
          updated_at: new Date('06-02-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('06-10-2020'),
          updated_at: new Date('06-10-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('06-18-2020'),
          updated_at: new Date('06-18-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('06-26-2020'),
          updated_at: new Date('06-26-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('07-03-2020'),
          updated_at: new Date('07-03-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('07-11-2020'),
          updated_at: new Date('07-11-2020'),
          team_id: 3,
        },
        {
          created_at: new Date('07-15-2020'),
          updated_at: new Date('07-15-2020'),
          team_id: 3,
        },
      ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('daily_boards', null, {});
  }
};
