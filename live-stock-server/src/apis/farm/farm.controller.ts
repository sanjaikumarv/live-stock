import farmModel from "./farm.model";
import { NextFunction, Request, Response } from "express";
import { InvalidDataError } from "../../lib/errors";
import { ReqUser } from "../../interfaces/common.interface";
import bcrypt from "bcrypt";
import userModel from "../user/user.model";

function createFarm(req: ReqUser, res: Response, next: NextFunction) {
  const {
    farmName,
    address1,
    address2,
    postCode,
    animalType = [],
    city,
    state,
    date,
    picName,
    picPhone,
    picEmail,
    password,
  } = req.body;

  farmModel
    .findOne({ picEmail })
    .then((farmExisting) => {
      if (farmExisting) {
        throw new InvalidDataError(`Farm with "${picEmail}" already exist`);
      }
      return farmModel.create({
        farmName: farmName,
        address1: address1,
        address2: address2,
        postCode: postCode,
        animalType: animalType.map((animal) => animal),
        city: city,
        state: state,
        date: date,
        picName: picName,
        picPhone: picPhone,
        picEmail: picEmail,
      });
    })
    .then((farm) => {
      return userModel.findOne({ email: picEmail });
    })
    .then((userExisting) => {
      if (userExisting) {
        throw new InvalidDataError(`User with "${picEmail}" already exist`);
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      return userModel.create({
        email: picEmail,
        phone: picPhone,
        firstName: farmName,
        password: hash,
        roles: [2],
      });
    })
    .then(() => {
      res.json({
        message: `Farm user created successfully ${picEmail}`,
      });
    })
    .catch(next);
}

function getFarm(req: ReqUser, res: Response, next: NextFunction) {
  farmModel
    .findOne()
    .then((farm) => {
      if (!farm) {
        throw new InvalidDataError("Farm not found");
      }
      res.json(farm);
    })
    .catch(next);
}

export { createFarm, getFarm };
