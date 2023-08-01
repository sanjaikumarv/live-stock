import { NextFunction, Request, Response } from "express";
import { accessSecret } from "../config/env";
import jwt from "jsonwebtoken";
import { getUserAbilities } from "../lib/permission";
import userModel from "../apis/user/user.model";

async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  const token = authHeader && (authHeader as string).split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unautherized User",
    });
  }

  try {
    const decodedUser = jwt.verify(token, accessSecret);

    const user = (await userModel.findOne({ email: decodedUser.email })) as any;
    const userAbilites = await getUserAbilities(user);
    // @ts-ignore
    req.user = {
      ...user,
      ...user._doc,
      abilities: userAbilites,
    };
    next();
  } catch (error) {
    res.status(403).json({
      message: "Access denied",
    });
  }
}

export default isAuthenticated;
