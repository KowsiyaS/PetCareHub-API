import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await knex("user").select("*").where("id", userId).first();

        if (!user) {
            return res.status(400).send("No user or wrong password");
        }

        const sanitized_user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.status(200).json(sanitized_user);
    } catch (error) {
        res.status(500).json({
            message: `Unable to fetch user: ${error}`,
        });
    }
};

export { getUser };
