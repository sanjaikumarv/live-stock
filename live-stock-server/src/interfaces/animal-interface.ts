import { ObjectId } from "mongoose";

export interface Animal {
  name: string;
  type: string;
  colour: string;
  date: Date;
  description: string;
  animalId: string;
  testDateTime: Date;
  testName: string;
  result: string;
  deleted?: boolean;
  createdBy?: ObjectId;
  updatedBy?: ObjectId;
}
