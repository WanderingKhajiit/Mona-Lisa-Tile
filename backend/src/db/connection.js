const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")('development');


module.exports = knex;