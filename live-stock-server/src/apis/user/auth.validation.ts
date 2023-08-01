import { Joi } from "express-validation";

const createUserBody = {
  firstName: Joi.string().label("First Name").required(),
  lastName: Joi.string().label("Last Name").required(),
  email: Joi.string().email().label("Email").required(),
  password: Joi.string().label("Password").required(),
  phone: Joi.string().label("Phone Number").required(),
  userType: Joi.number().label("User Type").required(),
};

export default {
  createUser: {
    body: Joi.object(createUserBody),
  },
};
