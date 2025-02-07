import React, { useState, useEffect } from "react";
import salesData from "../data/salesData.json";
import "./dashboard.css";
import Chart from "./chart";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Alle");
  const [sortOrder, setSortOrder] = useState("asc");

  /**
   * Lädt die Verkaufsdaten aus einer JSON-Datei und setzt den Zustand.
   * Wird einmal beim Laden der Komponente ausgeführt.
   */

  useEffect(() => {
    setData(salesData);
    setFilteredData(salesData);
  }, []);

   // Funktion für das Filtern nach Monat
   const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    if (month === "Alle") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.month === month));
    }
  };

    // Funktion für das Sortieren nach Plan-Zahl
    const handleSort = () => {
      const sortedData = [...filteredData].sort((a, b) => {
        return sortOrder === "asc" ? a.plan - b.plan : b.plan - a.plan;
      });
  
      setFilteredData(sortedData);
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

  /**
   * Berechnet verschiedene Verkaufskennzahlen basierend auf den gegebenen Daten.
   *
   * @param {Object} item - Ein Verkaufsdatensatz.
   * @param {number} item.plan - Geplante Verkaufszahlen für den Monat.
   * @param {number} item.actual - Tatsächliche Verkaufszahlen bis heute.
   * @param {number} item.days - Anzahl der verfügbaren Arbeitstage.
   * @returns {Object} - Berechnete Werte für die täglichen Verkaufsziele und den Fortschritt.
   */

  // // Funktion zur Berechnung der Werte
  // const calculateMetrics = (item) => {
  //   const tagesSoll = item.plan / item.days; // Wie viele Autos pro Tag verkauft werden müssen
  //   const tagesIst = item.actual / item.days; // Wie viele tatsächlich verkauft wurden
  //   const zielErreichungHeute = (tagesIst / tagesSoll) * 100; // Fortschritt bis heute
  //   const zielErreichungMonat = (item.actual / item.plan) * 100; // Monatsfortschritt

  //   return { tagesSoll, tagesIst, zielErreichungHeute, zielErreichungMonat };
  // };

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
      <button onClick={handleSort} style={{ marginLeft: "10px" }}>
        Sortieren nach Plan-Zahl ({sortOrder === "asc" ? "⬆️" : "⬇️"})
      </button>

      {/* Tabelle */}
      <table border="1" style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
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
          {filteredData.map((item, index) => {
            const tagesSoll = item.plan / item.days;
            const tagesIst = item.actual / item.days;
            const zielErreichungHeute = (tagesIst / tagesSoll) * 100;
            const zielErreichungMonat = (item.actual / item.plan) * 100;

            return (
              <tr key={index}>
                <td>{item.month}</td>
                <td>{item.plan}</td>
                <td>{item.actual}</td>
                <td>{item.days}</td>
                <td>{tagesSoll.toFixed(2)}</td>
                <td>{tagesIst.toFixed(2)}</td>
                <td className={zielErreichungHeute >= 100 ? "goal-achieved" : "goal-missed"}>
                  {zielErreichungHeute.toFixed(2)}%
                </td>
                <td className={zielErreichungMonat >= 100 ? "goal-achieved" : "goal-missed"}>
                  {zielErreichungMonat.toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Diagramm */}
      <h2>📊 Vergleich Plan vs. Ist</h2>
      <Chart data={filteredData} />
    </div>
  );
};

export default Dashboard;