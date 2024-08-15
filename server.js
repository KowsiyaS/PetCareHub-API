import express from "express";
import "dotenv/config";
import cors from "cors";
import multer from "multer";
import path from "path";
import authRoutes from "./routes/auth.js";
import petRoutes from "./routes/pet.js";
import appointmentRoutes from "./routes/appointment.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
    res.send("Welcome to the PetCare Hub API");
});

app.use("/login", authRoutes);
app.use("/pet", petRoutes);
app.use("/appointment", appointmentRoutes);

app.post("/api/upload", (req, res) => {
    res.send("upload successfully");
});

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    try {
        //TODO: add logic for request body form fields
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        res.status(400).send("Error uploading file");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
