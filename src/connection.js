const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "kontact",
  },
});

module.exports = knex;
