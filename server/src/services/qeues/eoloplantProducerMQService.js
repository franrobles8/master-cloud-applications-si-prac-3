const amqp = require("amqplib/callback_api");

const CONN_URL = "amqp://localhost";
const queueName = "eoloplantCreationRequests";

let ch = null;
amqp.connect(CONN_URL, (error, conn) => {
  if (error) {
    throw error;
  }
  conn.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    ch = channel;
    ch.assertQueue(queueName, {
      durable: true,
    });
  });
});

const publishToQueue = async (data) => {
  await ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};

process.on("exit", () => {
  ch.close();
  logger.info(`Closing rabbitmq channel`);
});

module.exports = {
  publishToQueue,
};
