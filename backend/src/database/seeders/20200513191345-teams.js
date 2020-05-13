'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('teams', 
      [
        {
          name: 'Alpha',
          code: '84F9A219',
          category: 'Design',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Beta',
          code: '9F4A6G5H',
          category: 'Desenvolvimento',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], 
      {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {});
    
  }
};
