import { ObjectId } from "mongoose";

export interface Farm {
  farmName: string;
  animalType: string[];
  address1: string;
  address2: string;
  postCode: string;
  city: string;
  state: string;
  phone: number;
  picName: string;
  picPhone: string;
  picEmail: string;
  deleted?: boolean;
  createdBy?: ObjectId;
  updatedBy?: ObjectId;
}
