import express from "express";
import * as vetController from "../controllers/vet-controller.js";

const router = express.Router();

router.get("/", vetController.getVets);

export default router;
