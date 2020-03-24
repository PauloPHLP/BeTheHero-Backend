const connection = require("../database/connection");

module.exports = {
  async createSession(req, resp) {
    const { id } = req.body;

    const ngo = await connection("ngos")
      .where("id", id)
      .select("name")
      .first();

    if (!ngo)
      return resp.status(400).json({ error: "No NGO was found with this ID."});

    return resp.json({ ngo });
  }
}