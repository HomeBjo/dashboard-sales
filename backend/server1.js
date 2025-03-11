require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const salesRoutes = require("./routes/salesRoutesOOP");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 
const USE_DUMMY_DATA = process.env.USE_DUMMY_DATA === "true";


/**
 * Middleware-Setup für Express:
 * - CORS erlaubt externe Anfragen.
 * - JSON-Parsing für ankommende Requests.
 */
app.use(cors({
  origin: ["https://dashboard.xn--bjrnteneicken-jmb.de", "http://localhost:3000"],
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
if (USE_DUMMY_DATA) {
  console.log("⚠️ Dummy-Modus aktiviert: Backend nutzt nur lokale Dummy-Daten.");
  const salesRoutes = require("./routes/salesRoutesOOP");

} else {
  console.log("✅ Verbinde mit MongoDB...");
  const mongoose = require("mongoose");
  const salesRoutes = require("./routes/salesRoutesOOP");

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB verbunden!"))
  .catch(err => console.error("❌ MongoDB Fehler:", err));

  // Falls MongoDB genutzt wird, API-Routen laden
  app.use("/api/sales", salesRoutes);
}


/**
 * API-Routen 
 */
app.use("/api/sales", salesRoutes);

// if (USE_DUMMY_DATA) {
//   app.get("/api/sales", (req, res) => {
//     res.json(dummySalesData);
//   });
// } else {
//   app.use("/api/sales", salesRoutes);
// }

/**
 * Startet den Express-Server auf dem definierten Port.
 * @function startServer
 */
app.listen(PORT, () => {
  console.log(` Server auf http://localhost:${PORT}`);
});
