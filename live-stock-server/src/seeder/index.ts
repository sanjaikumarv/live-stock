import mongoose, { close } from "../config/database";
import main0001 from "./0001";

async function dropCollections(colections: String[]) {
  for (const key of colections) {
    await mongoose.connection.dropCollection(key as string);
  }
}

async function main(): Promise<void> {
  try {
    if (process.argv[2] === "-d") {
      // To drop any collections here by passing collection names
      await dropCollections([
        "roles",
        "permissions",
        "states",
        "doctorCategories",
        "HealthCenterCategories",
      ]);
    } else {
      // To seed add methods here
      await main0001();
    }
  } finally {
    close();
  }
}

main();
