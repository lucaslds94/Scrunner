require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const config = {
  dialect: process.env.DB_DIALECT || "postgres",
  storage: './__tests__/database.sqlite',
  host: process.env.DB_HOST || "localhost",
  database: "scrunner",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "",
  logging: process.env.DB_DIALECT === 'sqlite' ? false : true,
  define: {
    timestamps: true,
    underscored: true,
  },
};

module.exports = config;
