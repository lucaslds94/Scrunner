const bcrypt = require("bcrypt");
("use strict");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        email: "johndoe@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: true,
        is_active: true,
        image: "noimage1.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "John Travolta",
        email: "johntravolta@test.com",
        is_owner: false,
        is_active: true,
        password: bcrypt.hashSync("12345678", 10),
        created_at: new Date(),
        updated_at: new Date(),
        image: "noimage2.svg",
      },
      {
        name: "Jony Bravo",
        email: "jonybravo@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Adele Hello",
        email: "adelehello@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage4.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Rick Martin",
        email: "rickmartin123@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage1.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Shakira Da Silva",
        email: "shakirasilvinha@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: true,
        is_active: true,
        image: "noimage4.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Walter White",
        email: "waltinho@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Morty Pereira",
        email: "mortypereira@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage2.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Elvis Santos",
        email: "elvissantos@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Steve Universo",
        email: "steveuniverso@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage4.svg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Scrunner",
        email: "scrunner@gmail.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: true,
        is_active: true,
        image: "noimage4.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
      {
        name: "Lucas Lima",
        email: "lucaslima@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage4.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
      {
        name: "Julianne Volotão",
        email: "juvolotao@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
      {
        name: "Lucas Andrade",
        email: "lucasandrade@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage1.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
      {
        name: "Lucas Zarza",
        email: "lucaszarza@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
      {
        name: "Maikom Rondado",
        email: "maikomrondado@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
      {
        name: "Sérgio Moura",
        email: "sergiomoura@test.com",
        password: bcrypt.hashSync("12345678", 10),
        is_owner: false,
        is_active: true,
        image: "noimage3.svg",
        created_at: new Date('04-08-2020'),
        updated_at: new Date('04-08-2020'),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
