import { ObjectId } from "mongoose";

export interface HealthCenter {
  userId: ObjectId;
  firstName: string;
  lastName: string;
  category: ObjectId;
  contactNumber: Number;
  contactPerson: Number;
  address1: string;
  address2: string;
  postCode: string;
  city: string;
  state: string;
  country: string;
  status: string;
  deleted?: boolean;
  createdBy?: ObjectId;
  updatedBy?: ObjectId;
}

export interface HealthCenterCategory {
  name: string;
  description: string;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  deleted: boolean;
}
