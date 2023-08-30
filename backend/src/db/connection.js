const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..",".env")})
const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
// console.log(process.env.NODE_ENV)
const knex = require("knex")(config);


module.exports = knex;