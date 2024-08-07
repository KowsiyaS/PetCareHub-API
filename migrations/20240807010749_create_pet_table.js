/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("inventories", (table) => {
        table.increments("id").primary();
        table
            .integer("user_id")
            .unsigned()
            .references("user.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("name").notNullable();
        table.string("birth_date").notNullable();
        table.string("species").notNullable();
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
    return knex.schema.dropTable("inventories");
}
