const USE_DUMMY_DATA = process.env.USE_DUMMY_DATA === "true";

if (!USE_DUMMY_DATA) {
  // Falls die echte DB genutzt wird, lade das normale Modell
  module.exports = require("./sales");
} else {
  // Falls Dummy-Daten genutzt werden, erstelle eine Fake-DB mit denselben Methoden
  let dummySalesData = [
    { month: "Januar", plan: 100, actual: 90, days: 22 },
    { month: "Februar", plan: 120, actual: 110, days: 20 },
  ];

  module.exports = {
    find: async () => dummySalesData,  // Gibt die Dummy-Daten zurück
    insertMany: async (data) => { 
      dummySalesData = [...dummySalesData, ...data]; 
      return data; 
    },
    findByIdAndDelete: async (id) => {
      dummySalesData = dummySalesData.filter((_, index) => index.toString() !== id);
      return { message: `Eintrag mit ID ${id} gelöscht (Dummy-Daten).` };
    },
  };
}
