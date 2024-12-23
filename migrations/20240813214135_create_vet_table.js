/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("vet", (table) => {
        table.increments("id").primary();
        table.string("place_id").notNullable();
        table.string("name").notNullable();
        table.string("address").notNullable();
        table.string("phone_number").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
            .timestamp("updated_at")
            .defaultTo(
                knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
            );
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("vet");
}
