require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 


/**
 * Middleware-Setup für Express:
 * - CORS erlaubt externe Anfragen.
 * - JSON-Parsing für ankommende Requests.
 */
app.use(cors());
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
 * Definiert das Schema für die Verkaufsdaten.
 * @typedef {Object} Sale
 * @property {string} month - Name des Monats.
 * @property {number} plan - Geplante Verkaufszahlen.
 * @property {number} actual - Tatsächliche Verkaufszahlen.
 * @property {number} days - Anzahl der verfügbaren Arbeitstage.
 */
const SalesSchema = new mongoose.Schema({
    month: String,
    plan: Number,
    actual: Number,
    days: Number
  });

  /** Erstellt ein Mongoose-Modell für die Verkaufsdaten. */
  const Sales = mongoose.model("Sales", SalesSchema);


/**
 * API-Route: Gibt alle Verkaufsdaten zurück.
 * @route GET /api/sales
 * @async
 * @returns {JSON} - Array aller Verkaufsdatensätze.
 */
app.get("/api/sales", async (req, res) => {
    try {
      const sales = await Sales.find();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ message: "Fehler beim Abrufen der Daten" });
    }
  });


/**
 * API-Route: Fügt Testdaten zur Datenbank hinzu.
 * @route GET /api/sales/add
 * @async
 * @returns {JSON} - Erfolgs- oder Fehlermeldung.
 */
// https://dashboard-sales-production.up.railway.app/api/sales/add  zum hinzufügen der daten in die online db
app.get("/api/sales/add", async (req, res) => {
  try {
    const testData = [
      { month: "Januar", plan: 100, actual: 90, days: 22 },
      { month: "Februar", plan: 120, actual: 110, days: 20 },
      { month: "März", plan: 130, actual: 130, days: 23 },
      { month: "April", plan: 140, actual: 0, days: 22 },
      { month: "Mai", plan: 150, actual: 0, days: 21 },
      { month: "Juni", plan: 160, actual: 0, days: 22 },
      { month: "Juli", plan: 170, actual: 0, days: 23 },
      { month: "August", plan: 180, actual: 0, days: 22 },
      { month: "September", plan: 190, actual: 0, days: 21 },
      { month: "Oktober", plan: 200, actual: 0, days: 22 },
      { month: "November", plan: 210, actual: 0, days: 21 },
      { month: "Dezember", plan: 220, actual: 0, days: 22 }
    ];

    await Sales.insertMany(testData);
    res.json({ message: "Testdaten erfolgreich gespeichert!" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Einfügen der Daten", error });
  }
});


/**
 * API-Route: Löscht einen bestimmten Verkaufsdatensatz per ID.
 * @route DELETE /api/sales/:id
 * @async
 * @param {string} req.params.id - Die ID des zu löschenden Verkaufsdatensatzes.
 * @returns {JSON} - Erfolgs- oder Fehlermeldung.
 */
app.delete("/api/sales/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Sales.findByIdAndDelete(id);
    console.log(` Eintrag mit ID ${id} gelöscht!`);
    res.json({ message: "Eintrag erfolgreich gelöscht!" });
  } catch (error) {
    console.error(" Fehler beim Löschen:", error);
    res.status(500).json({ message: "Fehler beim Löschen", error });
  }
});



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