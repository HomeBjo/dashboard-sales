import React, { useState, useEffect } from "react";
// import salesData from "../../data/salesData.json";
import { fetchSales, deleteSale } from "./api";
import "./dashboard.css";
import Chart from "./chart";


const Dashboard = () => {
  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Alle");
  const [sortOrder, setSortOrder] = useState("asc");


/**
 * Lädt die Verkaufsdaten aus der API und speichert sie im State.
 *
 * @function loadSalesData
 * @async
 * @returns {Promise<void>} - Setzt die Verkaufsdaten im State.
 */
const loadSalesData = async () => {
  const salesData = await fetchSales(); // API-Call nutzen

  if (salesData.length === 0) {
    console.error("Daten konnten nicht geladen werden.");
  }
  setData(salesData);
  setFilteredData(salesData);
};

useEffect(() => {
  loadSalesData();
}, []);


  /**
   * Filtert die Daten basierend auf dem ausgewählten Monat.
   *
   * @function handleMonthChange
   * @param {Event} event - Das Change-Event des Dropdowns.
   */  
   const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === "Alle") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.month === month));
    }
  };


  /**
   * Sortiert die Daten basierend auf der Plan-Zahl (aufsteigend/absteigend).
   *
   * @function handleSort
   */   
    const handleSort = () => {
      const sortedData = [...filteredData].sort((a, b) => {
        return sortOrder === "asc" ? a.plan - b.plan : b.plan - a.plan;
      });
  
      setFilteredData(sortedData);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };


  /**
   * Löscht einen Verkaufseintrag basierend auf der ID. Habe ich zum entwickeln gebraucht.
   *
   * @function handleDeleteSale
   * @async
   * @param {string} id - Die ID des zu löschenden Verkaufs.
   */   
  const handleDeleteSale = async (id) => {
    const success = await deleteSale(id);
    if (success) {
      setFilteredData(filteredData.filter((sale) => sale._id !== id));
      setData(data.filter((sale) => sale._id !== id));
    } else {
      console.error("Löschen fehlgeschlagen.");
    }
  };


  /**
   * Berechnet verschiedene Verkaufskennzahlen basierend auf den gegebenen Daten.
   *
   * @function calculateMetrics
   * @param {Object} item - Ein Verkaufsdatensatz.
   * @param {number} item.plan - Geplante Verkaufszahlen für den Monat.
   * @param {number} item.actual - Tatsächliche Verkaufszahlen bis heute.
   * @param {number} item.days - Anzahl der verfügbaren Arbeitstage.
   * @returns {Object} - Berechnete Werte für die täglichen Verkaufsziele und den Fortschritt.
   */

  const calculateMetrics = (item) => {
    const tagesSoll = item.plan / item.days; 
    const tagesIst = item.actual / item.days; 

    let zielErreichungHeute = (tagesIst / tagesSoll) * 100;
    zielErreichungHeute = Math.floor(zielErreichungHeute * 100) / 100; 

    const zielErreichungMonat = (item.actual / item.plan) * 100; 

    return { tagesSoll, tagesIst, zielErreichungHeute, zielErreichungMonat };
  };

  return (
    <div>
      <h1>🚗 Verkaufs-Dashboard</h1>

      {/* Dropdown-Menü für Monate */}
      <label htmlFor="month">Monat wählen: </label>
      <select id="month" onChange={handleMonthChange} value={selectedMonth}>
        <option value="Alle">Alle</option>
        {data.map((item, index) => (
          <option key={index} value={item.month}>{item.month}</option>
        ))}
      </select>

      {/* Sortierbutton */}
      <button className="button-spacing-l" onClick={handleSort}>
        Sortieren nach Plan-Zahl ({sortOrder === "asc" ? "⬆️" : "⬇️"})
      </button>

      {/* Tabelle */}
      <table>
        <thead>
          <tr>
            <th>Monat</th>
            <th>Plan-Zahl</th>
            <th>Ist-Zahl</th>
            <th>Arbeitstage</th>
            <th>Tages-Soll</th>
            <th>Tages-Ist</th>
            <th>Ziel heute (%)</th>
            <th>Ziel Monat (%)</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.length > 0 ? (
  filteredData.map((item, index) => {
    const { tagesSoll, tagesIst, zielErreichungHeute, zielErreichungMonat } = calculateMetrics(item);

    return (
      <tr key={index}>
        <td>{item.month}</td>
        <td>{item.plan}</td>
        <td>{item.actual}</td>
        <td>{item.days}</td>
        <td>{tagesSoll.toFixed(2)}</td>
        <td>{tagesIst.toFixed(2)}</td>
        <td className={item.actual === 0 ? "upcoming" : (zielErreichungHeute >= 100 ? "goal-achieved" : "goal-missed")}>
          {zielErreichungHeute.toFixed(2)}%
        </td>
        <td className={item.actual === 0 ? "upcoming" : (zielErreichungMonat >= 100 ? "goal-achieved" : "goal-missed")}>
         {zielErreichungMonat.toFixed(2)}%
         </td>
        {/* <td>
        <button onClick={() => handleDeleteSale(item._id)}>🗑️ Löschen</button>
        </td> */}
      </tr>
      
    );
  })
) : (
  <tr><td colSpan="8">Keine Daten verfügbar</td></tr> 
)}
        </tbody>
      </table>

      {/* Toggle-Button für Diagramm */}
      <button className="button-spacing" onClick={() => setShowChart(!showChart)}>
        {showChart ? "Diagramm ausblenden ⬆" : "Diagramm anzeigen ⬇"}
      </button>

      {/* Diagramm wird nur angezeigt, wenn `showChart` true ist */}
      {showChart && (
        <div className="dashboard-container">
          <h2 className="dashboard-title">📊 Vergleich Plan vs. Ist</h2>
          <Chart data={filteredData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;