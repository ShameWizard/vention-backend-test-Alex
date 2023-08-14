/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.createTable('materials', function (t) {
    t.increments('id').unsigned().primary();
    t.text('name');
    t.integer('base_power');
    t.integer('qty');
    t.timestamp('deleted_at');
  });
  await knex.schema.createTable('compositions', function (t) {
    t.integer('parent_id').index();
    t.integer('material_id').index();
    t.integer('qty');
  });
  await knex.schema.createTable('weapons', function (t) {
    t.increments('id').unsigned().primary();
    t.text('name');
    t.integer('material_1_id').index();
    t.integer('material_2_id').index().nullable();
    t.integer('material_3_id').index().nullable();
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
  await knex.schema.dropTable('materials');
  await knex.schema.dropTable('compositions');
  await knex.schema.dropTable('weapons');
};
