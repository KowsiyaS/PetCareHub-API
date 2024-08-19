/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("appointment").del();
    await knex("appointment").insert([
        {
            id: 1,
            pet_id: 1,
            vet_id: 1,
            description: "Vaccine for rabies",
            date: "2024-08-15",
            time: "11:00",
        },
        {
            id: 2,
            pet_id: 2,
            vet_id: 5,
            description: "Heartworm test",
            date: "2024-08-15",
            time: "15:00",
        },
    ]);
}
