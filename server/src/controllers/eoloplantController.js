const { Eoloplant } = require("../models");

const findAll = async (req, res) => {
  try {
    const eoloplants = await Eoloplant.findAll({});
    res.json({
      eoloplants,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
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
    res.json(eoloplant);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    const { city } = req.body;
    res.status(201).send(await Eoloplant.create({ city }));
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const affectedRows = await Eoloplant.destroy({ where: { id } });
    console.log(affectedRows);
    if (!affectedRows) {
      throw {
        status: 404,
        message: "Eoloplant not found",
      };
    }
    res.status(200).send();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  remove
};
