const { Eoloplant } = require("../models");

const findAll = async () => {
  return await Eoloplant.findAll({});
};

const findOne = async (id) => {
  const eoloplant = await Eoloplant.findAll({
    where: {
      id,
    },
  });

  if (!eoloplant || !eoloplant.length > 0) {
    throw {
      status: 404,
      message: "Eoloplant not found",
    };
  }

  return eoloplant;
};

const create = async (city) => {
  return await Eoloplant.create({ city });
};

const remove = async (id) => {
  const affectedRows = await Eoloplant.destroy({ where: { id } });

  if (!affectedRows) {
    throw {
      status: 404,
      message: "Eoloplant not found",
    };
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  remove
};
