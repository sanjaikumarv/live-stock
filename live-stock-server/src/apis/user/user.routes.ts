import express from "express";
import isAuthenticated from "../../middlewares/isAuthenticated";
import {
  createUser,
  loginUser,
  refreshToken,
  logout,
  getUserTypes,
  getUserPerms,
} from "./auth.controller";
import { validate } from "express-validation";
import schema from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validate(schema.createUser, {}, { convert: false, abortEarly: false }),
  createUser
);
router.post("/login", loginUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);
router.get("/perms", isAuthenticated, getUserPerms);
router.get("/protected", isAuthenticated, (req, res) => {
  res.json({
    message: "Protected",
  });
});
router.get("/user-types", getUserTypes);

export default router;
