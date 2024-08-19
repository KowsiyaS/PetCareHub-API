/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("medical_record", (table) => {
        table.increments("id").primary();
        table
            .integer("pet_id")
            .unsigned()
            .references("pet.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        table.string("name").notNullable();
        table.string("description").notNullable();
        table.string("url").notNullable();
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
    return knex.schema.dropTable("medical_record");
}
