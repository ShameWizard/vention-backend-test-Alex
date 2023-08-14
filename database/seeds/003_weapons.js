/**
 * @param {import('knex').Knex} knex
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('weapons')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('weapons').insert([
        {
          id: 1,
          name: 'Excalibur',
          material_1_id: 1,
          material_2_id: 6,
          material_3_id: 9
        },
        { id: 2, name: 'Magic Staff', material_1_id: 6 },
        {
          id: 3,
          name: 'Axe',
          material_1_id: 9,
          material_2_id: 12
        }
      ]);
    });
};
