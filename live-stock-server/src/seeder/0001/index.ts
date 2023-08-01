import { addPerms } from "./add-farm-perms";
import createStatesCities from "./create-states-and-cities";
import { addRoles } from "./user-role-perms.seed";

export default async function main002(): Promise<void> {
  console.log("----- Running main0001 -----");
  await addRoles();
  await addPerms();
  await createStatesCities();
}
