import animalModel from "./animal.model";
import { NextFunction, Request, Response } from "express";
import { InvalidDataError } from "../../lib/errors";
import { ReqUser } from "../../interfaces/common.interface";
import { checkAndAssign, ObjectId } from "../../util/common.util";
import aniamlTestModel from "./aniaml.test.model";

//animal controllers
function createAnimal(req: Request, res: Response, next: NextFunction) {
  animalModel
    .create({
      name: req.body.name,
      type: req.body.type,
      colour: req.body.colour,
      date: req.body.date,
      description: req.body.description,
      animalId: req.body.animalId,
    })
    .then((animal) => {
      res.json({
        message: "Animal profile created successfully",
        animal,
      });
    })
    .catch(next);
}

function updateAnimal(req: ReqUser, res: Response, next: NextFunction) {
  const animalId = req.params._id;
  animalModel
    .findOne({ _id: animalId })
    .then((animal) => {
      if (!animal) {
        throw new Error("Animal not found");
      }
      checkAndAssign(animal, "name", req.body.name);
      checkAndAssign(animal, "type", req.body.type);
      checkAndAssign(animal, "colour", req.body.colour);
      checkAndAssign(animal, "date", req.body.date);
      checkAndAssign(animal, "description", req.body.description);

      return animal.save();
    })
    .then((updatedAnimal) => {
      res.json({
        message: "Animal Updated Successfully",
        updatedAnimal,
      });
    })
    .catch(next);
}

function getAnimals(req: Request, res: Response, next: NextFunction) {
  animalModel
    .find()
    .then((animal) => {
      res.json(animal);
    })
    .catch(next);
}
function deleteAnimals(req: Request, res: Response, next: NextFunction) {
  animalModel
    .deleteMany()
    .then(() => {
      res.json({
        message: "Animal deleted successfully",
      });
    })
    .catch(next);
}

function deleteAnimal(req: ReqUser, res: Response, next: NextFunction) {
  const animalId = req.params._id;
  if (!animalId) {
    throw new InvalidDataError("Animal id is not found");
  }
  animalModel
    .deleteOne({ _id: animalId })
    .then((animal) => {
      if (!animal) {
        throw new InvalidDataError("Animal not found");
      }
      res.json("Animal deleted Successfully");
    })
    .catch(next);
}

function getAnimal(req: ReqUser, res: Response, next: NextFunction) {
  const animalId = req.params._id;
  if (!animalId) {
    throw new InvalidDataError("Animal id is not found");
  }
  animalModel
    .findOne({ _id: animalId })
    .then((animal) => {
      if (!animal) {
        throw new InvalidDataError("Animal is not found");
      }
      res.json(animal);
    })
    .catch(next);
}

//Animal Test controllers

function createAnimalTest(req: Request, res: Response, next: NextFunction) {
  animalModel
    .findOne({ _id: req.params.animalId })
    .then((animal) => {
      if (!animal) {
        throw new InvalidDataError("Animal is not found");
      }
      const animalTest = new aniamlTestModel({
        animalId: ObjectId(req.params.animalId),
        testName: req.body.testName,
        result: req.body.result,
        testDateTime: req.body.testDateTime,
      });
      return animalTest.save();
    })
    .then((animalTest) => {
      res.json({
        message: "Animal test created",
      });
    })
    .catch(next);
}

function updateAnimalTest(req: Request, res: Response, next: NextFunction) {
  aniamlTestModel
    .findOne({ _id: req.params.id })
    .then((animalTest) => {
      if (!animalTest) {
        throw new InvalidDataError("Tested animal data not found");
      }
      checkAndAssign(animalTest, "testName", req.body.testName);
      checkAndAssign(animalTest, "result", req.body.result);
      checkAndAssign(animalTest, "testDateTime", req.body.testDateTime);

      return animalTest.save();
    })
    .then((animalTest) => {
      res.json({
        message: "Animal Test Updated",
      });
    })
    .catch(next);
}

function getAnimalTests(req: Request, res: Response, next: NextFunction) {
  aniamlTestModel
    .find({ animalId: req.params.animalId })
    .then((testAnimals) => {
      res.json(testAnimals);
    })
    .catch(next);
}

function getAnimalTest(req: ReqUser, res: Response, next: NextFunction) {
  aniamlTestModel
    .findOne({ _id: req.params.id })
    .then((testAnimal) => {
      if (!testAnimal) {
        throw new InvalidDataError("Tested animal not found");
      }
      res.json(testAnimal);
    })
    .catch(next);
}
function deleteAnimalTest(req: ReqUser, res: Response, next: NextFunction) {
  aniamlTestModel
    .deleteOne({ _id: req.params.id })
    .then((testAnimal) => {
      if (!testAnimal) {
        throw new InvalidDataError("Tested animal not found");
      }
      res.json(testAnimal);
    })
    .catch(next);
}

export {
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
};
aniamlTestModel;
