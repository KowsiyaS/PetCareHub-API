import express from "express";
import * as reminderController from "../controllers/reminder-controller.js";

const router = express.Router();

router
    .route("/")
    .get(reminderController.getReminders)
    .post(reminderController.addReminder);

router
    .route("/:id")
    .put(reminderController.updateReminder)
    .delete(reminderController.deleteReminder);

export default router;
