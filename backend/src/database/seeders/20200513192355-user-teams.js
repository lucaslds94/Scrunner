'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('user_teams', 
    [
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 1,
        team_id: 1,
      },
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 2,
        team_id: 1,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 3,
        team_id: 1,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 4,
        team_id: 1,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 5,
        team_id: 1,
      },
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 6,
        team_id: 2,
      },
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 7,
        team_id: 2,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 8,
        team_id: 2,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 9,
        team_id: 2,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 10,
        team_id: 2,
      }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_teams', null, {});
  }
};
