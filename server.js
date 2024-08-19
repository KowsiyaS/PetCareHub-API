import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./utils/constants.js";
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pet.js";
import appointmentRoutes from "./routes/appointment.js";
import vetRoutes from "./routes/vet.js";
import reminderRoutes from "./routes/reminder.js";
import uploadRoutes from "./routes/upload.js";
import profileRoutes from "./routes/profile.js";
import geminiRoutes from "./routes/gemini.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get("/", (_req, res) => {
    res.send("Welcome to the PetCare Hub API");
});

app.use("/user", authRoutes);
app.use("/profile", authenticateJWT, profileRoutes);
app.use("/pet", authenticateJWT, petRoutes);
app.use("/appointment", authenticateJWT, appointmentRoutes);
app.use("/vets", authenticateJWT, vetRoutes);
app.use("/reminder", authenticateJWT, reminderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/medical-record", authenticateJWT, uploadRoutes);

app.use("/chat", authenticateJWT, geminiRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
