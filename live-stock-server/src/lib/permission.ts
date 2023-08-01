import { AbilityBuilder, Ability } from "@casl/ability";
import { Permission, User } from "../interfaces/user-interface";
import permissionModel from "../apis/user/permission.model";
import { NotAuthorizedError } from "./errors";

async function getUserAbilities(user: User) {
  const { can, build } = new AbilityBuilder(Ability);
  for (const role of user.roles) {
    const rolePerms = await permissionModel.findOne({
      roleId: role,
    });
    if (!rolePerms) {
      return;
    }
    for (const { actions, subject } of rolePerms?.perms as Permission[]) {
      for (const action of actions) {
        if (typeof action === "string") {
          can(action, subject);
          continue;
        }
        can(action.type, subject, action?.conditions as any);
      }
    }
  }
  return build();
}

async function getUserPermissions(user: User) {
  const { can, build } = new AbilityBuilder(Ability);
  for (const role of user.roles) {
    const rolePerms = await permissionModel.findOne({
      roleId: role,
    });
    for (const { actions, subject } of rolePerms?.perms as Permission[]) {
      for (const action of actions) {
        if (typeof action === "string") {
          can(action, subject);
          continue;
        }
        can(action.type, subject, action?.conditions as any);
      }
    }
  }
  return build();
}

function checkAccess(req, action, subject) {
  return req.user && req.user.abilities.can(action, subject);
}

function requireAccess(req, action, subject) {
  const hasAccess = checkAccess(req, action, subject);
  if (!hasAccess) {
    throw new NotAuthorizedError("Permission Denied");
  }
}

// async function main() {
//   const ablity = await getUserPermission({
//     name: "Santheep",
//     roles: [1],
//     email: "",
//   });

//   console.log("ablity", ablity.can("VsjhdfkIEW", "Appointment"));
// }

// main();

export { getUserAbilities, checkAccess, requireAccess };
