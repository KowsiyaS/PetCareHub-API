import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getReminders = async (req, res) => {
    const userId = req.user.id;

    try {
        const reminders = await knex("reminder")
            .join("pet", "reminder.pet_id", "pet.id")
            .select("reminder.*")
            .where("pet.user_id", userId);

        res.status(200).json(reminders);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve appointments",
        });
    }
};

const addReminder = async (req, res) => {
    if (!req.body.name || !req.body.date || !req.body.pet_id) {
        return res.status(400).json({
            message: "Please provide name, date and pet ID to add a reminder.",
        });
    }
    try {
        const result = await knex("reminder").insert(req.body);

        const newReminderId = result[0];
        const createdReminder = await knex("reminder").where({
            id: newReminderId,
        });

        res.status(201).json(createdReminder);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new reminder: ${error}`,
        });
    }
};

export { getReminders, addReminder };
