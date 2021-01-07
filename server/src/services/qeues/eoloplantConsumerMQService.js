const amqp = require("amqplib/callback_api");
const WebSocket = require("ws");
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

            sendProgressMessage({ id, city, progress, completed, planning });
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

const sendProgressMessage = ({ id, city, progress, completed, planning }) => {
  const ws = new WebSocket("ws://localhost:3000", {
    origin: "http://localhost:3000",
  });

  ws.on("open", function open() {
    if(completed && progress === 100) {
      ws.send(
        JSON.stringify({
          type: "eoloplant-completed",
          info: { id, city, progress, completed, planning },
        })
      );
    } else {
      ws.send(
        JSON.stringify({
          type: "eoloplant-inprogress",
          info: { id, city, progress, completed, planning },
        })
      );
    }
    ws.close();
  });
};

module.exports = {
  initConsumer,
};
