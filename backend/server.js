const PORT = process.env.PORT || "5000";
const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const {
  errorResponserHandler,
  invalidPathHandler,
} = require("./middleware/errorHandlers");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (_, res) => {
  res.send("Welcome to home page of SolarSense");
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.use(errorResponserHandler);
app.use(invalidPathHandler);

app.listen(PORT, () => {
  console.log("Listening to PORT", PORT);
});
