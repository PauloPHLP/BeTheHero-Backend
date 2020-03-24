const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = { 
  async get(req, resp) {
    const ngos = await connection("ngos").select("*");

    return resp.json(ngos);
  },

  async post(req, resp) {
    const ngo = req.body;
    const id = crypto.randomBytes(4).toString("HEX");
    
    await connection("ngos").insert({
      id,
      ...ngo
    });
  
    return resp.json({ id });
  }
}