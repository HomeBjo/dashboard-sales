const express = require("express");
const router = express.Router();
let useExternalAPI = process.env.USE_EXTERNAL_API === "true";


let dummySalesData = [
  { month: "Januar", plan: 100, actual: 90, days: 22 },
  { month: "Februar", plan: 120, actual: 110, days: 20 },
];

let dummyAPIdata = [
  { month: "Oktober", plan: 200, actual: 0, days: 22 },
  { month: "November", plan: 210, actual: 0, days: 21 },
  { month: "Dezember", plan: 220, actual: 0, days: 22 }
];

/**
 * Gibt alle Verkaufsdaten zurück.
 */
router.get("/", (req, res) => {
  
  if (useExternalAPI) {
  
      res.json(dummyAPIdata);
  } else {
     
      res.json(dummySalesData);
  }
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
router.get("/:months", (req, res) => {
  try {
    const { months } = req.params;
    const monthArray = months.split(",").map(m => m.trim()); // Monate in ein Array umwandeln
    const filteredData = dummySalesData.filter(sale => monthArray.includes(sale.month));

    if (filteredData.length === 0) {
      return res.status(404).json({ message: `Keine Daten für ${months} gefunden` });
    }

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Dummy-Daten", error });
  }
});


module.exports = router;
