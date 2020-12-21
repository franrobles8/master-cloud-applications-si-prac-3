const express = require("express");
const eoloPlantsRouter = require("./routes/eoloplantsRouter");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 8080;

const main = async () => {
  app.use(express.json());
  app.use("/api", eoloPlantsRouter);

  try {
    await db.sequelize.sync({ force: true });
    await db.initExampleData();
    console.log("Drop and re-sync db.");
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`Server API listening on port ${PORT}`);
  });

  process.on("SIGINT", async () => {
      await db.sequelize.close();
      console.log("Closed connection to the database");
      process.exit(0);
  });
};

main();
