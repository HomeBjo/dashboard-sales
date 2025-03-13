const mongoose = require("mongoose");

// eine save test klasse die prüft ob alle eine getAllSales haben (Interface)
class SalesDataSource {
  async getAllSales() {
    throw new Error("Methode getAllSales() muss implementiert werden!");
  }
}

class DummyData extends SalesDataSource {
  getAllSales() {
    return [
      { month: "Januar", plan: 100, actual: 90, days: 22 },
      { month: "Februar", plan: 120, actual: 110, days: 20 }
    ];
  }
}

class DummyAPIData extends SalesDataSource {
  getAllSales() {
    return [
      { month: "Oktober", plan: 200, actual: 0, days: 22 },
      { month: "November", plan: 210, actual: 0, days: 21 }
    ];
  }
}

class MongoDBData extends SalesDataSource {
  constructor() {
    super();
    const salesSchema = new mongoose.Schema({
      month: String,
      plan: Number,
      actual: Number,
      days: Number
    });

    this.model = mongoose.model("Sales", salesSchema);
  }
}

class SalesModel {
  constructor(useDummyData , useExternalAPI ) {

    if (useExternalAPI) {
      this.dataSource = new DummyAPIData();
    } else if (useDummyData) {
      this.dataSource = new DummyData();
    } else {
      this.dataSource = new MongoDBData(); 
    }
  }

  async getAllSales() {
    return this.dataSource.getAllSales();
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

  async getSalesByMonth(months) {
    console.log("📢 getSalesByMonth bekommt:", months);
    if (!Array.isArray(months)) {
        console.log("❌ Fehler: months ist kein Array!", months);
        return [];
    }

    if (this.useDummyData) {
        console.log("📢 Nutze DummyData:", this.dummyData);
        return this.dummyData.filter(sale => months.includes(sale.month));
    }

    return await this.model.find({ month: { $in: months } });
}}



  const useDummyData = process.env.USE_DUMMY_DATA === "true";
  const useExternalAPI = process.env.USE_EXTERNAL_API === "true";
 module.exports = new SalesModel(useDummyData, useExternalAPI);   


