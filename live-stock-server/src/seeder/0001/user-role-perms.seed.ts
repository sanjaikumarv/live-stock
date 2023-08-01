import rolesJSON from "./roles.json";

import roleModel from "../../apis/user/role.model";
import permissionModel from "../../apis/user/permission.model";
import logger from "../../lib/logger";

export const addRoles = () => {
  return roleModel.insertMany(rolesJSON).then(() => {
    logger.info({ message: "0001 Roles Inserted" });
  });
};
