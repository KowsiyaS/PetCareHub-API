/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex("vet").del();
    await knex("vet").insert([
        {
            id: 1,
            place_id: "ChIJX61xwjXL1IkRDNYMpctRgno",
            name: "The Animal Clinic",
            address: "106 Mutual St, Toronto, ON M5B 2R7, Canada",
            phone_number: "(416) 868-1545",
        },
        {
            id: 2,
            place_id: "ChIJ7To8vNs0K4gRNvvJLbs-Xf8",
            name: "Spadina Animal Hospital",
            address: "125 Spadina Ave., Toronto, ON M5V 2K8, Canada",
            phone_number: "(416) 506-0100",
        },
        {
            id: 3,
            place_id: "ChIJy29rIuM0K4gR9_uGfbxB1K4",
            name: "Queen West Animal Hospital",
            address: "931 Queen St W, Toronto, ON M6J 1G5, Canada",
            phone_number: "(416) 815-8387",
        },
        {
            id: 4,
            place_id: "ChIJMXwmY980K4gRWWFZTS63ynI",
            name: "Front Street Animal Hospital",
            address: "548 Front St W, Toronto, ON M5V 1C1, Canada",
            phone_number: "(416) 351-1212",
        },
        {
            id: 5,
            place_id: "ChIJee_0oWcsO4gRjc4OqqQzNus",
            name: "CML HealthCare Inc.",
            address: "280 Spadina Ave., Toronto, ON M5T 3A5, Canada",
            phone_number: "(416) 603-1197",
        },
        {
            id: 6,
            place_id: "ChIJVfzHpu40K4gR9iQFBtX5MhE",
            name: "College Street Animal Hospital",
            address: "486 College St, Toronto, ON M6G 1A4, Canada",
            phone_number: "(416) 642-1444",
        },
        {
            id: 7,
            place_id: "ChIJh7QjEJM0K4gR9mswqoulqu0",
            name: "Annex Animal Hospital",
            address: "716 Bathurst St, Toronto, ON M5S 2R4, Canada",
            phone_number: "(416) 537-3128",
        },
        {
            id: 8,
            place_id: "ChIJ90WFJ6k0K4gRAqYVLFQAVNE",
            name: "Veterinary Emergency Clinic",
            address: "920 Yonge St Suite 117, Toronto, ON M4W 3C7, Canada",
            phone_number: "(416) 920-2002",
        },
        {
            id: 9,
            place_id: "ChIJizIwGaQ0K4gRk0GCR1ebt_A",
            name: "Yorkville Animal Hospital",
            address: "135 Avenue Rd, Toronto, ON M5R 2H7, Canada",
            phone_number: "(416) 923-8896",
        },
        {
            id: 10,
            place_id: "ChIJeWcZoLI0K4gRxCm0VYzjizY",
            name: "VCA Canada Downtown Animal Hospital",
            address: "579 Church St, Toronto, ON M4Y 2E4, Canada",
            phone_number: "(416) 966-5122",
        },
    ]);
}
