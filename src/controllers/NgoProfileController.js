const connection = require("../database/connection");

module.exports = { 
  async getNgoProfile(req, resp) {
    const ngo_id = req.headers.authorization;

    const incidents = await connection("incidents")
      .where("ngo_id", ngo_id)
      .select("*");

    return resp.json(incidents);
  }
}