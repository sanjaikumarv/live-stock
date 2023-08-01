import express from "express";
const router = express.Router();
import userRoutes from "./user/user.routes";
import farmRoutes from "./farm/farm.routes";
import animalRoutes from "./animal/animal.routes";

router.use("/user", userRoutes);
router.use("/farm", farmRoutes);
router.use("/animal", animalRoutes);

export default router;
