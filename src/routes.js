const { celebrate, Segments, Joi } = require("celebrate");
const express = require("express");
const SesssionController = require("./controllers/SessionController");
const NgoProfileController = require("./controllers/NgoProfileController");
const NgosController = require("./controllers/NgosController");
const IncidentsController = require("./controllers/IncidentsController");
const routes = express.Router();

//Sessions
routes.post("/sessions", SesssionController.createSession);

//NGOS
routes.get("/ngos", NgosController.get);
routes.post("/ngos", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), NgosController.post);

//NGOS Profile Controller
routes.get("/ngo_profile", celebrate({
  [Segments.HEADERS]: Joi.object({
    Authorization: Joi.string().required()
  }).unknown()
}), NgoProfileController.getNgoProfile);

//Incidents
routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}), IncidentsController.get);
routes.post("/incidents", IncidentsController.post);
routes.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), IncidentsController.delete);

module.exports = routes;