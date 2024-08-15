import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getAppointments = async (req, res) => {
    const userId = 1;

    try {
        const appointments = await knex("appointment")
            .join("pet", "appointment.pet_id", "pet.id")
            .select("appointment.*")
            .where("pet.user_id", userId);

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve appointments",
        });
    }
};

const addAppointment = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.birth_date ||
        !req.body.species ||
        !req.body.user_id
    ) {
        return res.status(400).json({
            message:
                "Please provide name, birth_date and species to add a pet.",
        });
    }

    try {
        const result = await knex("pet").insert(req.body);

        const newPetId = result[0];
        const createdPet = await knex("pet").where({
            id: newPetId,
        });

        res.status(201).json(createdPet);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new pet: ${error}`,
        });
    }
};

const availableTimeslots = async (req, res) => {
    const { date, vet_id } = req.body;

    try {
        const appointments = await knex("Appointments")
            .select("time")
            .where("date", date)
            .andWhere("vet_id", vet_id);

        const timeSlots = [
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
        ];

        const availableSlots = timeSlots.filter(
            (slot) => !appointments.includes(slot)
        );

        res.status(200).json(availableSlots);
    } catch (error) {
        res.status(500).send({ error: "Error fetching available timeslots" });
    }
};

export { getAppointments, addAppointment, availableTimeslots };
