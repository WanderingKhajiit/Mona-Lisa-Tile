// Update with your config settings.
const path = require("path")
const dotenv = require('dotenv');
dotenv.config();
const pg = require("pg")
const { 
  DATABASE_URL = "postgres://sofngvuv:9tlxl9l7LC9-XrBJ35sBUagttWEsQ0mS@lallah.db.elephantsql.com/sofngvuv",
  DATABASE_DEV = "postgres://dvhhnzyu:bGt-MnlE2z0XYYPApNnNUpLC0Eb9JE-o@queenie.db.elephantsql.com/dvhhnzyu"
} = process.env;


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgresql",
    connection: DATABASE_DEV,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", 'seeds')
    }
  },
  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", 'seeds')
    }
  },


};
