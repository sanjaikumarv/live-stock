import { Channel, Connection } from "amqplib";
import { Error } from "mongoose";
import logger from "./logger";
import connection from "../config/rabiitmq";

const notificationQueue = "notification_queue";

/**
 * @method publishNotification
 * @param {Object} payload to send to the consumer
 * @returns {*} void
 */
export const publishNotification = (payload: any) => {
  connection
    .then((conn: Connection) => conn.createChannel())
    .then((channel: Channel) =>
      channel.assertQueue(notificationQueue).then(() => {
        channel.sendToQueue(
          notificationQueue,
          Buffer.from(JSON.stringify(payload))
        );
      })
    )
    .catch((error: Error) => {
      logger.error({
        message: `[x] Publish Notification ${error}`,
      });
    });
};

/**
 * @method consumeNotification
 * @returns {*} void
 */

export const consumeNotification = () => {
  connection
    .then((conn: Connection) => conn.createChannel())
    .then((channal: Channel) =>
      channal.assertQueue(notificationQueue).then(() => {
        logger.info({
          message: `[*] Waiting for messages in ${notificationQueue}`,
        });

        return channal.consume(notificationQueue, async (msg: any) => {
          if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            console.log("Message", message);
            channal.ack(msg);
          }
        });
      })
    )
    .catch((error: Error) => {
      logger.error({
        message: `[x] Consume Notification ${error}`,
      });
    });
};
