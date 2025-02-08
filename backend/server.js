require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Verbindung 1
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB verbunden!"))
  .catch(err => console.error("❌ MongoDB Fehler:", err));


  // Model für Verkaufszahlen
const SalesSchema = new mongoose.Schema({
    month: String,
    plan: Number,
    actual: Number,
    days: Number
  });
  const Sales = mongoose.model("Sales", SalesSchema);


  // API-Endpunkte 1
app.get("/api/sales", async (req, res) => {
    try {
      const sales = await Sales.find();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Abrufen der Daten" });
    }
  });


// Server starten
app.listen(PORT, () => {
  console.log(` Server auf http://localhost:${PORT}`);
});


// Dummy data 2(später durch DB ersetzt)
// const salesData = [
//   { month: "Januar", plan: 100, actual: 90, days: 22 },
//   { month: "Februar", plan: 120, actual: 110, days: 20 },
// ];

// // API-Routen Dummy verbindung 2
// app.get("/api/sales", (req, res) => {
//   res.json(salesData);
// });