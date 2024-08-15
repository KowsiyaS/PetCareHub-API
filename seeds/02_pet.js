/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("pet").del();
    await knex("pet").insert([
        {
            id: 1,
            user_id: 1,
            name: "Fluffy",
            birth_date: "2018-06-02",
            species: "dog",
        },
        {
            id: 2,
            user_id: 1,
            name: "Spot",
            birth_date: "2018-06-02",
            species: "dog",
        },
    ]);
}
