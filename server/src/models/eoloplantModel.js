const { DataTypes } = require("sequelize");

const Eoloplant = (sequelize, Sequelize) => {
  return sequelize.define(
    "eoloplant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city: {
        type: DataTypes.STRING,
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        isIn: {
          args: [[0, 25, 50, 75, 100]],
        },
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      planning: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
      validate: {
        isValidProgress: function () {
          if (![0, 25, 50, 75, 100].includes(this.progress)) {
            throw new Error(
              "Wrong progress value. It must be one of [0, 25, 50, 75, 100]."
            );
          }
        },
      },
    }
  );
};

module.exports = Eoloplant;
