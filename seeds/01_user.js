import bcrypt from "bcryptjs";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("user").del();
    await knex("user").insert([
        {
            id: 1,
            name: "Jane Doe",
            email: "jane@example.com",
            password: bcrypt.hashSync("rootroot"),
        },
    ]);
}
