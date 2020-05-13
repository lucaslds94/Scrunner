'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('user_teams', 
    [
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 1,
        teams_id: 1,
      },
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 2,
        teams_id: 1,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 3,
        teams_id: 1,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 4,
        teams_id: 1,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 5,
        teams_id: 1,
      },
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 6,
        teams_id: 2,
      },
      {
        is_leader: true,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 7,
        teams_id: 2,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 8,
        teams_id: 2,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 9,
        teams_id: 2,
      },
      {
        is_leader: false,
        created_at: new Date(),
        updated_at: new Date(),
        users_id: 10,
        teams_id: 2,
      }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_teams', null, {});
  }
};
