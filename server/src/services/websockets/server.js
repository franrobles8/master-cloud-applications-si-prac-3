const { logger } = require("../../utils/logger");
const WebSocket = require("ws");

const initialize = (wss) => {
  wss.on("connection", (ws) => {
    logger.info("[Websocket] Server connected");
    ws.on("message", (message) => {
      logger.info("[Websocket] Message received: " + message);
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  });
};

module.exports = {
  initialize,
};
