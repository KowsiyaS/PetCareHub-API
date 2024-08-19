import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getVets = async (_req, res) => {
    try {
        const vets = await knex("vet").select("*");

        res.status(200).json(vets);
    } catch (error) {
        res.status(500).json({
            message: "Unable to retrieve vets",
        });
    }
};

const getOneVet = async (req, res) => {
    const { id } = req.params;
    try {
        const vets = await knex("vet").where({ id }).select("*").first();

        res.status(200).json(vets);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve vet with ${id}`,
        });
    }
};

export { getVets, getOneVet };
