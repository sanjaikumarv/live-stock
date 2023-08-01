import { ObjectId } from "mongoose";

export interface AnimalTest {
  animalId: string;
  testDateTime: Date;
  testName: string;
  result: string;
  deleted?: boolean;
  createdBy?: ObjectId;
  updatedBy?: ObjectId;
}
