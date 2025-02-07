require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data (später durch DB ersetzt)
const salesData = [
  { month: "Januar", plan: 100, actual: 90, days: 22 },
  { month: "Februar", plan: 120, actual: 110, days: 20 },
];

// API-Routen
app.get("/api/sales", (req, res) => {
  res.json(salesData);
});

// Server starten
app.listen(PORT, () => {
  console.log(` Server auf http://localhost:${PORT}`);
});
