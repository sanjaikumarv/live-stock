import { rabbitmqConnection } from "./env";
import amqplib from "amqplib";

const connection: any = amqplib.connect(rabbitmqConnection);

export default connection;
