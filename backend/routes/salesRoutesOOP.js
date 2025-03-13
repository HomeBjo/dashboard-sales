const express = require("express");
const salesModel = require("../model/salesOOP");
console.log("✅ SalesModel geladen:", salesModel);
const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const sales = await salesModel.getAllSales();
//     res.json(sales);
//   } catch (error) {
//     res.status(500).json({ message: "Fehler beim Abrufen der Daten", error });
//   }
// });

router.get("/", async (req, res) => {

  let months = req.query.months; 
  if (!months) {
    return res.json(await salesModel.getAllSales());
  }
  const monthArray = months.split(",").map(m => m.trim());

  const sales = await salesModel.getSalesByMonth(monthArray);

  if (sales.length === 0) {
    return res.status(404).json({ message: "Keine Daten gefunden" });
  }

  res.json(sales);
});

router.get("/add", async (req, res) => {
  try {
    const testData = [
      { month: "Januar", plan: 100, actual: 90, days: 22 },
      { month: "Februar", plan: 120, actual: 110, days: 20 },
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
router.get("/test", async (req, res) => {
  res.json({ message: "🚀 Route funktioniert! 🎉" });
});

router.get("/:months", async (req, res) => {
  try {
    const { months } = req.params;
    const monthArray = months ? months.split(",") : [];
    console.log(" getSalesByMonth wird aufgerufen mit:", monthArray);
    const sales = await salesModel.getSalesByMonth(monthArray);
    console.log("Ergebnis:", sales);
    if (sales.length === 0) {
      return res.status(404).json({ message: `Keine Daten gefunden` });
    }

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Abrufen der Daten", error });
  }
});


module.exports = router;
