const express = require("express");
const salesModel = require("../model/sales");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Daten", error });
  }
});

router.get("/add", async (req, res) => {
  try {
    const testData = [
      { month: "Januar", plan: 100, actual: 90, days: 22 },
      { month: "Februar", plan: 120, actual: 110, days: 20 }
    ];
    await salesModel.addSalesData(testData);
    res.json({ message: "Testdaten erfolgreich gespeichert!" });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Einfügen der Daten", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await salesModel.deleteSaleById(id);
    res.json({ message: `Eintrag mit ID ${id} erfolgreich gelöscht!` });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Löschen", error });
  }
});

module.exports = router;
