import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/constants.js";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).send("Please enter the required fields");
    }

    // Find the user
    const user = await knex("user").select("*").where("email", email);
    if (!user) {
        return res.status(400).send("No user or wrong password");
    }

    // Validate the password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(400).send("No user or wrong password");
    }

    // Generate a token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
    });

    res.send({ token });
};

export { login };
