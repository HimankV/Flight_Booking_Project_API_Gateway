const express = require("express");
const { PORT } = require("./config").ServerConfig;
const apiRoutes = require("./routes");
const { Logger } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on https://localhost:${PORT}`);
  Logger.info(`Successfully started the server`, `root`, {});
});
