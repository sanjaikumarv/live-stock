import apiV1Routes from "../apis/main.routes";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";
import {
  consumeNotification,
  publishNotification,
} from "../lib/notification.worker";

import "./database";
import cookieParser from "cookie-parser";
import generateOtp from "../lib/otp";
import { ValidationError } from "express-validation";
import httpLogger from "../middlewares/httpLogger";
import roleModel from "../apis/user/role.model";
import {
  ApiError,
  InvalidDataError,
  NotAuthorizedError,
  NotFoundError,
} from "../lib/errors";
const app = express();

app.use(httpLogger);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  // publishNotification({
  //   name: faker.name.findName(),
  //   message: faker.lorem.lines(),
  // });

  roleModel
    .find({})
    .then((resData) => {
      res.send("Locum Zone Running" + generateOtp(5)).end();
      return Promise.resolve("sdfk");
    })
    .then(() => {
      console.log("Lorem MOMOMOMOMOMOMOMOOOOOMOMOOOO");
    });
});

consumeNotification();

app.use("/api", apiV1Routes);

function throwErrorResponse(res: Response, status: number, err: any) {
  const errorObj = {
    message: err.message,
    stack: err.stack,
  };

  res.status(status).json(errorObj);
}
// Error Handling
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof ValidationError) {
      // validation error contains errors which is an array of error each containing message[]
      const messages = [];
      (err.details.params || []).forEach((em) => messages.push(em.message));
      (err.details.body || []).forEach((em) => messages.push(em.message));

      const unifiedErrorMessage = messages.join(" and ");

      return throwErrorResponse(res, 400, {
        message: unifiedErrorMessage,
        stack: err.stack,
      });
    }

    if (err instanceof NotFoundError) {
      return throwErrorResponse(res, 404, err);
    }
    if (err instanceof InvalidDataError) {
      return throwErrorResponse(res, 400, err);
    }
    if (err instanceof NotAuthorizedError) {
      return throwErrorResponse(res, 403, err);
    }
    throwErrorResponse(res, 500, err);
  }
);

export default app;
