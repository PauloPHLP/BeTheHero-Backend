const express = require("express");
const app = express();

app.get("/", (req, resp) => {
  return resp.json({
    event: "OmniStack week 11.0",
    student: "Paulo Lima"
  });
});

app.listen(3333);