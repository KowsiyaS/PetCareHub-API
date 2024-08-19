/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("reminder").del();
    await knex("reminder").insert([
        {
            id: 1,
            pet_id: 1,
            name: "Pill",
            description: "Give heartworm and tick prevention",
            date: "2024-08-16",
            time: "09:00",
        },
        {
            id: 2,
            pet_id: 2,
            name: "Grooming appointment",
            description: "add on nail trim",
            date: "2024-08-16",
            time: "15:00",
        },
    ]);
}
