const bcrypt = require("bcrypt");
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('users', 
      [
        {
          name: 'John Doe',
          email: 'johndoe@test.com',
          password: bcrypt.hashSync('12345678', 10),     
          is_owner: true,
          is_active: true,     
          created_at: new Date(),
          updated_at: new Date()
        }, 
        {
          name: 'John Travolta',
          email: 'johntravolta@test.com',
          is_owner: false,
          is_active: true,  
          password: bcrypt.hashSync('12345678', 10),          
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Jony Bravo',
          email: 'jonybravo@test.com',
          password: bcrypt.hashSync('12345678', 10),
          is_owner: false,
          is_active: true,          
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Adele Hello',
          email: 'adelehello@test.com',
          password: bcrypt.hashSync('12345678', 10), 
          is_owner: false,
          is_active: true,         
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Rick Martin',
          email: 'rickmartin123@test.com',
          password: bcrypt.hashSync('12345678', 10),  
          is_owner: false,
          is_active: true,        
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Shakira Da Silva',
          email: 'shakirasilvinha@test.com',
          password: bcrypt.hashSync('12345678', 10),     
          is_owner: true,
          is_active: true,      
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Walter White',
          email: 'waltinho@test.com',
          password: bcrypt.hashSync('12345678', 10),
          is_owner: false,
          is_active: true,        
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Morty Pereira',
          email: 'mortypereira@test.com',
          password: bcrypt.hashSync('12345678', 10), 
          is_owner: false,
          is_active: true,         
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Elvis Santos',
          email: 'elvissantos@test.com',
          password: bcrypt.hashSync('12345678', 10), 
          is_owner: false,
          is_active: true,          
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Steve Universo',
          email: 'steveuniverso@test.com',
          password: bcrypt.hashSync('12345678', 10),      
          is_owner: false,
          is_active: true,     
          created_at: new Date(),
          updated_at: new Date()
        }
    ]);
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
