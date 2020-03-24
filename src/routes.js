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
routes.post("/ngos", NgosController.post);

//NGOS Profile Controller
routes.get("/ngo_profile", NgoProfileController.getNgoProfile);

//Incidents
routes.get("/incidents", IncidentsController.get);
routes.post("/incidents", IncidentsController.post);
routes.delete("/incidents/:id", IncidentsController.delete);

module.exports = routes;