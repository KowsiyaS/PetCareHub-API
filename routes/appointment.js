import express from "express";
import * as appointmentController from "../controllers/appointment-controller.js";

const router = express.Router();

router
    .route("/")
    .get(appointmentController.getAppointments)
    .post(appointmentController.addAppointment);

router.get("/timeslots", appointmentController.availableTimeslots);

router.put("/:id", appointmentController.updateAppointment);
export default router;
