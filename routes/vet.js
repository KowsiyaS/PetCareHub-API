import express from "express";
import * as vetController from "../controllers/vet-controller.js";

const router = express.Router();

router.get("/", vetController.getVets);

router.get("/:id", vetController.getOneVet);

export default router;
