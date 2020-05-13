'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('daily_contents', 
      [
        {
          did_yesterday: 'Finalizada o layout da página de cadastro',
          do_today: 'Otimização da interface' ,
          problems: 'A cadeira não é confortável',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 1,
          users_id: 2,
        },
        {
          did_yesterday: 'Finalizado o layout da página de login',
          do_today: 'Finalização do layout do login' ,
          problems: 'Minhas costas estão doendo',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 1,
          users_id: 3,
        },
        {
          did_yesterday: 'Finalizado o layout do dashboard do líder',
          do_today: 'Otimização do dashboard' ,
          problems: 'Esse mouse da apple está com má conexão',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 1,
          users_id: 4,
        },
        {
          did_yesterday: 'Ajustes na UX',
          do_today: 'Refatoração de telas para melhor conforto da usabilidade.' ,
          problems: 'Computador travando',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 1,
          users_id: 5,
        },
        {
          did_yesterday: 'Ajustes nas regras do projeto',
          do_today: 'Refatoração do ER' ,
          problems: 'Mysql travando',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 2,
          users_id: 7,
        },
        {
          did_yesterday: 'Finalizado o menu responsivo',
          do_today: 'Modificar animações da landing page' ,
          problems: ' Má comunicação com o time de design ',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 2,
          users_id: 8,
        },
        {
          did_yesterday: 'Integração da API com frontend',
          do_today: 'Finalizar a integração' ,
          problems: 'Nenhum',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 2,
          users_id: 9,
        },
        {
          did_yesterday: 'Configuração do protocolo HTTPS',
          do_today: 'Finalização da configuração dos protocolos' ,
          problems: 'Teclado com letra H e T com mal funcionamento',
          created_at: new Date(),
          updated_at: new Date(),
          daily_boards_id: 2,
          users_id: 10,
        }
      ],);
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('daily_contents', null, {});
  }
};
