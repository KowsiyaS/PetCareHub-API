import express from "express";
import * as reminderController from "../controllers/reminder-controller.js";

const router = express.Router();

router
    .route("/")
    .get(reminderController.getReminders)
    .post(reminderController.addReminder);

export default router;
