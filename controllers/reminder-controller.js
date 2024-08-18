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

const updateReminder = async (req, res) => {
    const { id } = req.params;

    if (!req.body.name || !req.body.date || !req.body.pet_id) {
        return res.status(400).json({
            message: "Please provide name, date and pet ID to add a reminder.",
        });
    }
    try {
        await knex("reminder").where({ id }).update(req.body);

        const updatedReminder = await knex("reminder").where({ id }).first();

        res.status(201).json(updateReminder);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new reminder: ${error}`,
        });
    }
};

const deleteReminder = async (req, res) => {
    const { id } = req.params;

    try {
        const reminder = await knex("reminder").where({ id }).first();

        if (!reminder) {
            return res.status(404).json({
                message: "Reminder not found.",
            });
        }

        await knex("reminder").where({ id }).del();

        res.status(200).json({
            message: "Reminder successfully deleted.",
        });
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete reminder: ${error.message}`,
        });
    }
};

export { getReminders, addReminder, updateReminder, deleteReminder };
