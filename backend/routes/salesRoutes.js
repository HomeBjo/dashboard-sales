const express = require("express");
const Sales = require("../models/Sales"); 

const router = express.Router();

/**
 * API-Route: Gibt alle Verkaufsdaten zurück.
 * @route GET /api/sales
 * @async
 * @returns {JSON} - Array aller Verkaufsdatensätze.
 */
router.get("/", async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Daten", error });
  }
});

/**
 * Fügt Testdaten hinzu.
 * @route GET /api/sales/add
 */
// https://dashboard-sales-production.up.railway.app/api/sales/add  zum hinzufügen der daten in die online db
router.get("/add", async (req, res) => {
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
 * Löscht einen Verkaufsdatensatz per ID.
 * @route DELETE /api/sales/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Sales.findByIdAndDelete(id);
    res.json({ message: `Eintrag mit ID ${id} erfolgreich gelöscht!` });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Löschen", error });
  }
});

module.exports = router;
