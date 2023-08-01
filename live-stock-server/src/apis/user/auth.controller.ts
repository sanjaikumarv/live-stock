import { NextFunction, Request, Response } from "express";
import userModel from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  accessExpiry,
  accessSecret,
  refreshExpiry,
  refreshSecret,
} from "../../config/env";
import roleModel from "./role.model";
import permissionModel from "./permission.model";
import { InvalidDataError, NotAuthorizedError } from "../../lib/errors";
import { getJWTExpiry } from "../../util/common.util";

function sendOtp(req: Request, res: Response, next: NextFunction) {
  // Generate otp using otp generator
  // Save otp hash in otp modal along with number
  // Send otp to user
  // Verify that otp before craating User
}

function createUser(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, password, email, phone, userType } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const payload = {
    firstName,
    lastName,
    password: hash,
    email,
    roles: [userType],
    phone,
  };

  userModel
    .findOne({ email })
    .then((userExisting) => {
      if (userExisting) {
        throw new InvalidDataError(`User with "${email}" already exist`);
      }
      return roleModel.findOne({ roleId: userType });
    })
    .then((roleExisting) => {
      if (!roleExisting) {
        throw new InvalidDataError(`Invalid User Type`);
      }
      return userModel.create(payload);
    })
    .then((user) => {
      res.json({
        message: `User Created Successfuly - ${user.firstName}`,
      });
    })
    .catch(next);
}

function loginUser(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const passCompare = bcrypt.compareSync(password, user.password);
      if (!passCompare) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const tokenData = {
        name: user.firstName + user.lastName,
        email: user.email,
        roles: user.roles,
      };
      const accessToken = jwt.sign(tokenData, accessSecret, {
        expiresIn: accessExpiry,
      });

      const newRefreshToken = jwt.sign(tokenData, refreshSecret, {
        expiresIn: refreshExpiry,
      });

      const cookieRefreshToken = req.cookies?.refreshToken;
      // if refreshToken already there in cookies
      const newRefreshTokens = !cookieRefreshToken
        ? user.refreshTokens
        : user.refreshTokens.filter((rt) => rt !== cookieRefreshToken);

      // clearing old token
      if (cookieRefreshToken) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: false,
          secure: true,
        });
      }

      // Saving refresh tokens to db and sending
      user.refreshTokens = [...newRefreshTokens, newRefreshToken];
      user
        .save()
        .then(() => {
          res.cookie("refreshToken", newRefreshToken, {
            maxAge: 24 * 60 * 60 * 1000, // 1 Day
            httpOnly: true,
            sameSite: false,
          });

          res.json({
            message: "Login success",
            accessToken,
            expiry: getJWTExpiry(accessToken),
          });
        })
        .catch(next);
    })
    .catch(next);
}

function refreshToken(req: Request, res: Response, next: NextFunction) {
  const cookies = req.cookies;
  // No cookie refreshToken from client
  if (!cookies?.refreshToken)
    return res.status(401).json({
      message: "Unautherized",
    });
  const refreshToken = cookies.refreshToken;

  userModel
    .findOne({ refreshTokens: refreshToken })
    .then(async (user) => {
      let newRefreshTokens;
      jwt
        .verify(refreshToken, refreshSecret, async (err, decoded) => {
          // if (!user && !err) {
          //   // cookie refresh token exists and no user found. So user is malicious
          //   const hackedUser = await userModel.findOne({
          //     email: decoded.email,
          //   });
          //   hackedUser.refreshTokens = [];
          //   await hackedUser.save();
          //   throw new NotAuthorizedError("Forbidden 1");
          // }

          newRefreshTokens = user.refreshTokens.filter(
            (rt) => rt !== refreshToken
          );
          // No decoded so token is expired (TODO: Need to check)
          if (err) {
            user.refreshTokens = [...newRefreshTokens];
            await user.save();
            throw new NotAuthorizedError("Refresh Token Expired");
          }

          // No decoded or refresh token user not matching with db user
          if (err || user.email !== decoded.email) {
            throw new NotAuthorizedError("Forbidden");
          }

          // Everything goes good
          const tokenPayload = {
            name: user.firstName + user.lastName,
            email: user.email,
            roles: user.roles,
          };

          // Generating new refreshToken everytime to give max security
          const newRefreshToken = jwt.sign(tokenPayload, refreshSecret, {
            expiresIn: refreshExpiry,
          });

          // create new access token
          const accessToken = jwt.sign(tokenPayload, accessSecret, {
            expiresIn: accessExpiry,
          });

          // Saving refresh token on db
          user.refreshTokens = [...newRefreshTokens, newRefreshToken];

          user
            .save()
            .then(() => {
              res.cookie("refreshToken", newRefreshToken, {
                maxAge: 24 * 60 * 60 * 1000, // 1 Day
                httpOnly: true,
                sameSite: false,
              });
              res.json({
                accessToken,
                expiry: getJWTExpiry(accessToken),
              });
            })
            .catch(next);
        })
        .catch(next);

      // const newRefreshTokens = user.refreshTokens.filter(
      //   (rt) => rt !== refreshToken
      // );
    })
    .catch(next);
}

function logout(req: Request, res: Response, next: NextFunction) {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.sendStatus(204); //No content
  const refreshToken = cookies.refreshToken;

  // Is refreshToken in db?
  userModel
    .findOne({ refreshTokens: refreshToken })
    .then((user: any) => {
      if (!user) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: false,
          secure: true,
        });
        return res.json({
          message: "User Logged Out",
        });
      }

      // Delete refreshToken in db
      user.refreshTokens = user.refreshTokens.filter(
        (rt) => rt !== refreshToken
      );
      return user.save();
    })
    .then(() => {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: false,
        secure: true,
      });
      res.json({
        message: "User Logged Out Successfully",
      });
    })
    .catch(next);
}

function getUserTypes(req: Request, res: Response, next: NextFunction) {
  const commonUserTypes = [2, 3];
  roleModel
    .find({
      roleId: { $in: commonUserTypes },
    })
    .then((roles) => {
      const userTypes = roles.map((r) => ({
        label: r.roleLabel,
        value: r.roleId,
      }));
      res.json(userTypes);
    })
    .catch(next);
}

function getUserPerms(req: any, res: Response, next: NextFunction) {
  permissionModel
    .find({
      roleId: {
        $in: req.user.roles,
      },
    })
    .then((perms) => {
      res.json(perms || []);
    })
    .catch(next);
}

export {
  createUser,
  loginUser,
  refreshToken,
  logout,
  getUserTypes,
  getUserPerms,
};
