require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 


/**
 * Middleware-Setup für Express:
 * - CORS erlaubt externe Anfragen.
 * - JSON-Parsing für ankommende Requests.
 */
app.use(cors({
  origin: ["https://dashboard.xn--bjrnteneicken-jmb.de/", "http://localhost:3000"],
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());


/**
 * Verbindet sich mit MongoDB unter Verwendung der in `.env` definierten URI.
 * @async
 * @function connectDB
 * @returns {Promise<void>} - Verbindet sich mit der MongoDB-Datenbank.
 */
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB verbunden!"))
  .catch(err => console.error("❌ MongoDB Fehler:", err));


/**
 * API-Routen
 */
app.use("/api/sales", salesRoutes);


/**
 * Startet den Express-Server auf dem definierten Port.
 * @function startServer
 */
app.listen(PORT, () => {
  console.log(` Server auf http://localhost:${PORT}`);
});


//----------> Entwicklungs Code der für Lokale Tests verwendet werden kann
// Dummy data 2(später durch DB ersetzt)
// const salesData = [
//   { month: "Januar", plan: 100, actual: 90, days: 22 },
//   { month: "Februar", plan: 120, actual: 110, days: 20 },
// ];

// // API-Routen Dummy verbindung 2
// app.get("/api/sales", (req, res) => {
//   res.json(salesData);
// });