const { publishToQueue } = require("../services/qeues/eoloplantProducerMQService");
const EoloplantService = require("../services/eoloplantService");
const {
    validateSchema,
    eoloplantCreateBodySchema,
    idRequestParamSchema
} = require("./validators");

const findAll = async (_, res) => {
  try {
    const eoloplants = await EoloplantService.findAll();

    res.json({
      eoloplants,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const findOne = async (req, res) => {
  try {
    validateSchema(idRequestParamSchema, req.params);

    const id = req.params.id;

    const eoloplant = await EoloplantService.findOne(id);

    res.json(eoloplant);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const create = async (req, res) => {
  try {
    validateSchema(eoloplantCreateBodySchema, req.body);

    const { city } = req.body;

    const eoloplant = await EoloplantService.create(city);

    await publishToQueue({id: eoloplant.id, city: eoloplant.city});

    res.status(201).send({message: "Eoloplant has been created"});
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const remove = async (req, res) => {
  try {
    validateSchema(idRequestParamSchema, req.params);

    const id = req.params.id;

    await EoloplantService.remove(id);
    
    res.status(200).json({message: "Eoloplant removed successfully"});
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
