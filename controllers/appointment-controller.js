import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getAppointments = async (req, res) => {
    const userId = req.user.id;
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
        !req.body.pet_id ||
        !req.body.vet_id ||
        !req.body.date ||
        !req.body.time
    ) {
        return res.status(400).json({
            message:
                "Please provide pet ID,vet ID, date and time to add an appointment.",
        });
    }

    try {
        const result = await knex("appointment").insert(req.body);

        const newAppointmentId = result[0];
        const createdAppointment = await knex("appointment").where({
            id: newAppointmentId,
        });

        res.status(201).json(createdAppointment);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new pet: ${error}`,
        });
    }
};

const availableTimeslots = async (req, res) => {
    const { date, vet_id } = req.query;
    console.log(date, vet_id);
    try {
        const appointments = await knex("appointment")
            .select("time")
            .where("date", date)
            .andWhere("vet_id", vet_id);

        const bookedTimes = appointments.map((appointment) => appointment.time);

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
            (slot) => !bookedTimes.includes(slot)
        );

        res.status(200).json(availableSlots);
    } catch (error) {
        console.error("Error fetching available timeslots:", error);
        res.status(500).send({ error: "Error fetching available timeslots" });
    }
};

export { getAppointments, addAppointment, availableTimeslots };
