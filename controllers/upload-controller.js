import multer from "multer";
import path from "path";
import initKnex from "knex";
import configuration from "../knexfile.js";

const knex = initKnex(configuration);

const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    },
}).single("file");

const uploadFile = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send("Error uploading file: " + err.message);
        }

        const { name, description, pet_id } = req.body;

        const fileUrl = `http://localhost:8080/uploads/${req.file.filename}`;

        try {
            const [id] = await knex("medical_record").insert({
                pet_id,
                name,
                description,
                url: fileUrl,
            });

            res.status(201).json({ fileUrl, id });
        } catch (error) {
            res.status(500).send("Unable to add record.");
        }
    });
};

const getAllPetRecords = async (req, res) => {
    const { id } = req.params;

    try {
        const records = await knex("medical_record")
            .where("pet_id", id)
            .select("*");

        if (records) {
            res.status(200).json(records);
        } else {
            res.status(404).send("medical records not found");
        }
    } catch (error) {
        res.status(500).send("Unable to retrieve file.");
    }
};

const getRecordById = async (req, res) => {
    const recordId = req.params.id;

    try {
        const record = await knex("medical_record")
            .where({ id: recordId })
            .first();

        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).send("File not found");
        }
    } catch (error) {
        res.status(500).send("Unable to retrieve file.");
    }
};

export { getRecordById, uploadFile, getAllPetRecords };
