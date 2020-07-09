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
      },
      {
        is_leader: true,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 11,
        team_id: 3,
      },
      {
        is_leader: false,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 12,
        team_id: 3,
      },
      {
        is_leader: false,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 13,
        team_id: 3,
      },
      {
        is_leader: false,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 14,
        team_id: 3,
      },
      {
        is_leader: false,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 15,
        team_id: 3,
      },
      {
        is_leader: false,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 16,
        team_id: 3,
      },
      {
        is_leader: true,
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
        user_id: 17,
        team_id: 3,
      },
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_teams', null, {});
  }
};
