import jwtDecode from "jwt-decode";
import mongoose, { ObjectId, AnyArray } from "mongoose";

export function whenWillExpire(exp: string): number {
  return Number(exp) - Number(Date.now().toString().slice(0, 10));
}
export function getJWTExpiry(jwtToken: string): number {
  const decoded: any = jwtDecode(jwtToken);
  return whenWillExpire(decoded.exp);
}

export function ObjectId(id: string): any {
  if (!id) {
    throw new Error("No id given for ObjectId function");
  }
  return new mongoose.mongo.ObjectId(id);
}

export const checkAndAssign = (model, fieldName, fieldValue) => {
  if (fieldValue) {
    model[fieldName] = fieldValue;
  }
};
