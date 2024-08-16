import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pet.js";
import appointmentRoutes from "./routes/appointment.js";
import vetRoutes from "./routes/vet.js";
import reminderRoutes from "./routes/reminder.js";
import uploadRoutes from "./routes/upload.js";

const app = express();
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
    res.send("Welcome to the PetCare Hub API");
});

app.use("/login", authRoutes);
app.use("/pet", petRoutes);
app.use("/appointment", appointmentRoutes);
app.use("/vets", vetRoutes);
app.use("/reminder", reminderRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/medical-record", uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
