const mongoose = require("mongoose");

class SalesModel {
  constructor(useDummyData = false) {
    this.useDummyData = useDummyData;
    this.dummyData = [
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

    if (!useDummyData) {
      const salesSchema = new mongoose.Schema({
        month: String,
        plan: Number,
        actual: Number,
        days: Number
      });

      this.model = mongoose.model("Sales", salesSchema);
    }
  }

  async getAllSales() {
    if (this.useDummyData) {
      return this.dummyData;
    }
    return await this.model.find();
  }

  async addSalesData(data) {
    if (this.useDummyData) {
      this.dummyData.push(...data);
      return { message: "Daten lokal gespeichert (Dummy-Modus)" };
    }
    return await this.model.insertMany(data);
  }

  async deleteSaleById(id) {
    if (this.useDummyData) {
      this.dummyData = this.dummyData.filter((sale, index) => index !== parseInt(id));
      return { message: `Eintrag mit Index ${id} gelöscht (Dummy-Modus)` };
    }
    return await this.model.findByIdAndDelete(id);
  }
}

// Singleton mit Dummy-Daten-Option
const useDummyData = process.env.USE_DUMMY_DATA === "true";
module.exports = new SalesModel(useDummyData);


