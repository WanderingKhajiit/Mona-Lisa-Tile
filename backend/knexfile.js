// Update with your config settings.
const path = require("path")
require("dotenv").config();
const { 
  DATABASE_URL = "postgres://dvhhnzyu:bGt-MnlE2z0XYYPApNnNUpLC0Eb9JE-o@queenie.db.elephantsql.com/dvhhnzyu"
} = process.env;


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", 'seeds')
    }
  },



};
