import express from "express";
import * as profileController from "../controllers/profile-controller.js";

const router = express.Router();

router.get("/", profileController.getUser);

export default router;
