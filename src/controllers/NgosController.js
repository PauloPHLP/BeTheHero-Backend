const connection = require("../database/connection");
const generateUniqueID = require("../utils/generateUniqueID");

module.exports = { 
  async get(req, resp) {
    const ngos = await connection("ngos").select("*");

    return resp.json(ngos);
  },

  async post(req, resp) {
    const ngo = req.body;
    const id = generateUniqueID();
    
    await connection("ngos").insert({
      id,
      ...ngo
    });
  
    return resp.json({ id });
  }
}