const express = require("express");
const router = express.Router();

let dummySalesData = [
  { month: "Januar", plan: 100, actual: 90, days: 22 },
  { month: "Februar", plan: 120, actual: 110, days: 20 },
];

/**
 * Gibt alle Verkaufsdaten zurück.
 */
router.get("/", (req, res) => {
  res.json(dummySalesData);
});

/**
 * Fügt Testdaten zur Dummy-Datenbank hinzu.
 */
router.get("/add", (req, res) => {
  try {
    const testData = [
      { month: "März", plan: 130, actual: 130, days: 23 },
      { month: "April", plan: 140, actual: 0, days: 22 },
    ];
    dummySalesData = [...dummySalesData, ...testData];
    res.json({ message: "Testdaten erfolgreich hinzugefügt (Dummy-Daten)!" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Einfügen der Dummy-Daten", error });
  }
});

/**
 * Gibt die Verkaufsdaten für einen bestimmten Monat zurück.
 */
router.get("/:month", (req, res) => {
  try {
    const { month } = req.params;
    const filteredData = dummySalesData.filter(sale => sale.month === month);

    if (filteredData.length === 0) {
      return res.status(404).json({ message: `Keine Daten für ${month} gefunden` });
    }

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Dummy-Daten", error });
  }
});

module.exports = router;
