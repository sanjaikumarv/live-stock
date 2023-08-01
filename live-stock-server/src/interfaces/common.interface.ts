import { Request } from "express";

export interface ReqUser extends Request {
  user: any; // or any other type
}
