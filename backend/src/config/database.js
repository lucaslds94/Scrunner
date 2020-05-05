require("dotenv").config();

const config = {
  dialect: "postgres",
  host: process.env.DB_HOST ||"localhost",
  database: "scrunner",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "",
  define: {
    timestamps: true,
    underscored: true,
  },
};

module.exports = config;
