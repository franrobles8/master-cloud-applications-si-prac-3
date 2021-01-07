const express = require("express");
const eoloPlantsRouter = require("./routes/eoloplantsRouter");
const viewsRouter = require("./routes/viewsRouter");
const db = require("./models");
const { initConsumer } = require("./services/qeues/eoloplantConsumerMQService");
const { logger } = require("./utils/logger");
const mustacheExpress = require('mustache-express');
const http = require('http');
const WsServer = require('./services/websockets/server');
const app = express();
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = process.env.PORT || 3000;

const main = async () => {
  app.use(express.json());
  app.use('/', viewsRouter);
  app.use("/api", eoloPlantsRouter);
  app.use(express.static(__dirname + '/public'));
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'mustache');
  app.engine('mustache', mustacheExpress());

  try {
    WsServer.initialize(wss);
    await db.sequelize.sync({ force: true });
    await db.initExampleData();
    logger.info("[Drop and re-sync db]");
    initConsumer();
    logger.info("[Consumer service started]");
  } catch (error) {
    logger.error(error);
  }

  server.listen(PORT, () => {
    logger.info(`Server API listening on port ${PORT}`);
  });

  process.on("exit", async () => {
      await db.sequelize.close();
      logger.info("[Closed connection to the database]");
      process.exit(0);
  });
};

main();