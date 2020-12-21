const dbConfig = require("../config/index").database;
const { Sequelize } = require("sequelize");
const EoloplantModel = require("./eoloplantModel");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: "mysql",
  }
);

const Eoloplant = EoloplantModel(sequelize, Sequelize);

const initExampleData = async () => {
  try {
    await Eoloplant.create({city: "Madrid"});
    await Eoloplant.create({city: "Barcelona", progress: 75});
    await Eoloplant.create({city: "Valladolid", progress: 100, completed: true, planning: "valladolid-sunny-flat"});
  } catch (error) {
    console.log(error.message || "Error initializing DB example data");
  }
};

module.exports = {
  Sequelize,
  sequelize,
  Eoloplant,
  initExampleData
};
