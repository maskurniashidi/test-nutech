require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sequelize = require("./database.js");
const authRoutes = require("./routes/authRoutes.js");
const barangRoutes = require("./routes/barangRoutes.js");

const app = express();
const port = process.env.PORT || 3000;

// pake ketika ingin migrate db
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Database and tables created");
//   })
//   .catch((error) => {
//     console.error("Error creating database and tables:", error);
//   });

sequelize
  .sync()
  .then(() => {
    console.log("Database and tables created");
  })
  .catch((error) => {
    console.error("Error creating database and tables:", error);
  });

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", barangRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
