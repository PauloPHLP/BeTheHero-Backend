const connection = require("../database/connection");

module.exports = { 
  async get(req, resp) {
    const { page = 1 } = req.query;
    const [count] = await connection("incidents").count();
    const incidents = await connection("incidents")
      .join("ngos", "ngos.id", "=", "incidents.ngo_id")
      .limit(5)  
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ngos.name",
        "ngos.email",
        "ngos.whatsapp",
        "ngos.city",
        "ngos.fu"
      ]); 

    resp.header("X-Total-Count", count["count(*)"]);

    return resp.json(incidents);
  },

  async post(req, resp) {
    const incident = req.body;
    const ngo_id = req.headers.authorization;

    const [id] = await connection("incidents").insert({
      ...incident,
      ngo_id
    });

    return resp.json({ id });
  },

  async delete(req, resp) { 
    const {id} = req.params;
    const ngo_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("ngo_id")
      .first();

    if (incident.ngo_id !== ngo_id) 
      return resp.status(401).json({ error: "Operation not authorized."});

    await connection("incidents").where("id", id).delete();

    return resp.status(204).send();
  }
}