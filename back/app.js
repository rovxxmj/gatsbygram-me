require("dotenv/config");
const express = require("express");
const apiRouter = require("./routes/api");
const db = require("./models");
const app = express();
app.set("PORT", process.env.PORT || 3085);

db.sequelize
  .sync()
  .then(() => console.log("✅ DB is connected"))
  .catch(() => console.error("❌ DB connection Error"));

app.use("/api", apiRouter);

app.listen(app.get("PORT"), () =>
  console.log(`✅ Server is on http://localhost:${app.get("PORT")}`)
);
