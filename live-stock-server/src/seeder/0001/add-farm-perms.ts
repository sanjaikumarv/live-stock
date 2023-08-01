import permissionModel from "../../apis/user/permission.model";
import logger from "../../lib/logger";
import farmPerms from "./farm.perms.json";

export const addPerms = () => {
  return permissionModel.insertMany(farmPerms).then(() => {
    logger.info({ message: "0001 Permissions Inserted" });
  });
};
