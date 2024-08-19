import express from "express";
import * as geminiController from "../controllers/gemini-controller.js";

const router = express.Router();

router.post("/", geminiController.getAIResponse);

export default router;
