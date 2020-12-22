const amqp = require("amqplib/callback_api");
const { Eoloplant } = require("../../models");

const initConsumer = () => {
  const CONN_URL = "amqp://localhost";
  const queueName = "eoloplantCreationProgressNotifications";

  amqp.connect(CONN_URL, (error, conn) => {
    if (error) {
      throw error;
    }
    conn.createChannel((err, ch) => {
      if (err) {
        throw err;
      }

      ch.assertQueue(queueName, {
        durable: true,
      });

      ch.consume(
        queueName,
        (msg) => {
          // Parse message and save progress into Database, timeout only to simulate processing...
          setTimeout(async () => {
            const { id, city, progress, completed, planning } = JSON.parse(
              msg.content.toString()
            );
            await Eoloplant.update(
              { id, city, progress, completed, planning },
              { where: { id } }
            );
          }, 8000);
        },
        { noAck: true }
      );

      process.on("exit", () => {
        ch.close();
        logger.info(`Closing rabbitmq channel`);
      });
    });
  });
};

module.exports = {
  initConsumer,
};
