/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const moment = require('moment')

exports.up = function(knex) {
  return knex.schema.createTable("jobs", (table) => {
    table.increments("job_id").primary();
    table.string("neighborhood");
    table.text("picture", "longtext")
    table.string("worker");
    table.text("date");
    table.timestamp("created_at")
  }).then(() => {
    // Run the update statement to populate the formatted_date column
    return knex.raw(`UPDATE jobs SET date = to_char(null::date, 'DD.MM.YYYY')::text`);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("jobs");
};
