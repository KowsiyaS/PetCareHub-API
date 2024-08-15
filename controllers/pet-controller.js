import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getPets = async (req, res) => {
    const userId = 1;

    try {
        const pets = await knex("pet").select("*").where("user_id", userId);

        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve pets",
        });
    }
};

const addPet = async (req, res) => {
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

export { getPets, addPet };
