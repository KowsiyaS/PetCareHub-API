import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/constants.js";
import initKnex from "knex";
import configuration from "../knexfile.js";
import bcrypt from "bcryptjs";

const getProfile = async (req, res) => {
    // If there is no auth header provided
    if (!req.headers.authorization) {
        return res.status(401).send("Please login");
    }

    // Parse the bearer token
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split(" ")[1];

    // Verify the token
    try {
        const decodedToken = jwt.verify(authToken, SECRET_KEY);
        console.log(decodedToken);

        // Respond with the appropriate user data
        const user = users.find((user) => user.email === decodedToken.email);
        const sanitized_user = {
            id: user.id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            role: user.role,
        };

        res.send(sanitized_user);
    } catch (error) {
        console.error(error);
        res.status(401).send("Invalid auth token");
    }
};

export { getProfile };
