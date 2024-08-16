import express from "express";
import * as uploadController from "../controllers/upload-controller.js";

const router = express.Router();

router.post("/upload", uploadController.uploadFile);

router.get("/:id", uploadController.getRecordById);

export default router;
