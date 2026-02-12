const express = require("express");
const { PORT, FLIGHT_SERVICE, BOOKING_SERVICE } =
  require("./config").ServerConfig;
const apiRoutes = require("./routes");
const { Logger } = require("./config");
const rateLimit = require("express-rate-limit");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { User, Role } = require("./models");

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(
  "/flightsService",
  createProxyMiddleware({
    target: FLIGHT_SERVICE,
    changeOrigin: true,
  }),
);

app.use(
  "/bookingService",
  createProxyMiddleware({
    target: BOOKING_SERVICE,
    changeOrigin: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on https://localhost:${PORT}`);
  Logger.info(`Successfully started the server`, `root`, {});
});
