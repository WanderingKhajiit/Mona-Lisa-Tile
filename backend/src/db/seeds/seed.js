/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('jobs').del()
  await knex('jobs').insert([
    {neighborhood: 'longhorn', worker: "brian"},
    {neighborhood: 'longhorn', worker: "brian"},
    {neighborhood: 'longhorn', worker: "brian"}
  ]);
};
