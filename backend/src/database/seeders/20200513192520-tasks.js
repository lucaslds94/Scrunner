'use strict';
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', 
    [
      {
        title: 'Otimização da interface',
        description: 'Devemos deixar a interface mais fluida',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 1,
        user_id: 2, 
      },
      {
        title: 'Finalização do layout do login',
        description: 'Adicionar inputs e estilização',
        task_points: 100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 1,
        user_id: 3, 
      },
      {
        title: 'Otimização do dashboard',
        description: 'Deveremos otimizar a dashboard',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 1,
        user_id: 4, 
      },
      {
        title: 'Ajustes na UX',
        description: ' Melhorar o posicionamento dos botões e hovers',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 1,
        user_id: 5, 
      },
      {
        title: 'Refatoração do ER',
        description: 'Adicionar tabelas intermediárias',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 2,
        user_id: 7, 
      },
      {
        title: 'Finalizar rotas de autenticação',
        description: 'Criar e enviar tokens por JWT',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 2,
        user_id: 8, 
      },
      {
        title: 'Finalizar a integração',
        description: 'Ajustes nas chamadas da API e respostas do servidor',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 2,
        user_id: 9, 
      },
      {
        title: 'Finalização da configuração dos protocolos',
        description: 'Ajustar a segurança do sistema adicionando protocolos https',
        task_points:  100,
        created_at: moment(new Date()).format('MM/DD/YYYY'),
        updated_at: moment(new Date()).format('MM/DD/YYYY'),
        task_column_id: 1,
        task_board_id: 2,
        user_id: 10, 
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
