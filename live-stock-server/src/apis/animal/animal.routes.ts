import express from "express";
const router = express.Router();
import {
  createAnimal,
  getAnimals,
  getAnimal,
  deleteAnimals,
  deleteAnimal,
  updateAnimal,
  createAnimalTest,
  updateAnimalTest,
  getAnimalTests,
  getAnimalTest,
  deleteAnimalTest,
} from "./animal.controller";

router.post("/", createAnimal);
router.get("/", getAnimals);
router.get("/:_id", getAnimal);
router.delete("/", deleteAnimals);
router.delete("/:_id", deleteAnimal);
router.put("/:_id", updateAnimal);

router.post("/test/:animalId", createAnimalTest);
router.put("/test/:id", updateAnimalTest);
router.get("/tests/:animalId", getAnimalTests);
router.get("/test/:id", getAnimalTest);
router.delete("/test/:id", deleteAnimalTest);

export default router;
