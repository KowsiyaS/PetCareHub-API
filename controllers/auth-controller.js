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

    const user = await knex("user").select("*").where("email", email).first();
    console.log(user);
    if (!user) {
        return res.status(400).send("No user or wrong password");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    console.log();
    if (!isPasswordCorrect) {
        return res.status(400).send("No user or wrong password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "24h",
    });

    res.send({ token });
};

const signUp = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Please provide name, email and password to add a user.",
        });
    }

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    };

    try {
        const result = await knex("user").insert(newUser);

        const newUserId = result[0];
        const user = await knex("user").where({
            id: newUserId,
        });

        const sanitized_user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.status(201).json(sanitized_user);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new user: ${error}`,
        });
    }
};

export { login, signUp };
