import express from "express";
import * as petController from "../controllers/pet-controller.js";

const router = express.Router();

router.route("/").get(petController.getPets).post(petController.addPet);

export default router;
