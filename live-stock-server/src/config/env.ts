import "dotenv/config";

// import path from "path";
// dotenv.config({
//   path: path.resolve(__dirname, "..", "..", ".env"),
// });

const nodeEnv = process.env.NODE_ENV;
const rabbitmqConnection = process.env.RABBIT_MQ_CONNECTION_STRING as string;
const connectionString = process.env.MONGO_DB_CONNECTION_STRING;
const port = process.env.APP_PORT || 3000;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const fileStorageLocation = process.env.FILE_STORAGE_LOCATION;
const refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY;
const accessExpiry = process.env.ACCESS_TOKEN_EXPIRY;

export {
  connectionString,
  port,
  rabbitmqConnection,
  nodeEnv,
  refreshSecret,
  accessSecret,
  fileStorageLocation,
  refreshExpiry,
  accessExpiry,
};
