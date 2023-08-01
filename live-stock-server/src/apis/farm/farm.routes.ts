import express from "express";
const router = express.Router();
import { createFarm, getFarm } from "./farm.controller";

router.post("/", createFarm);
router.get("/", getFarm);

export default router;
