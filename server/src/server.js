const express = require("express");
const eoloPlantsRouter = require("./routes/eoloplantsRouter");
const db = require("./models");
const { initConsumer } = require("./services/qeues/eoloplantConsumerMQService");
const { logger } = require("./utils/logger");

const app = express();
const PORT = process.env.PORT || 8080;

const main = async () => {
  app.use(express.json());
  app.use("/api", eoloPlantsRouter);

  try {
    await db.sequelize.sync({ force: true });
    await db.initExampleData();
    logger.info("[Drop and re-sync db]");
    initConsumer();
    logger.info("[Consumer service started]");
  } catch (error) {
    logger.error(error);
  }

  app.listen(PORT, () => {
    logger.info(`Server API listening on port ${PORT}`);
  });

  process.on("exit", async () => {
      await db.sequelize.close();
      logger.info("[Closed connection to the database]");
      process.exit(0);
  });
};

main();
