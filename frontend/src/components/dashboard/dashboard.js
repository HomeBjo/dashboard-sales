import React, { useState, useEffect } from "react";
// import salesData from "../../data/salesData.json";
import "./dashboard.css";
import Chart from "./chart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  console.log("State von data:", data);
  const [showChart, setShowChart] = useState(false); // ⬅ Zustand für Chart-Steuerung
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Alle");
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sales");
        const data = await response.json();
        console.log('hier drin ist', data);
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };

    fetchData(); // Aufruf der async Funktion
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


    // Funktion für Delete
    const deleteSale = async (id) => {
      try {
        const response = await fetch(`http://localhost:5000/api/sales/${id}`, { method: "DELETE" });
        const result = await response.json();
        console.log(result.message);
    
        setFilteredData(filteredData.filter((sale) => sale._id !== id));
        setData(data.filter((sale) => sale._id !== id));
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
      }
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

  // Funktion zur Berechnung der Werte
  const calculateMetrics = (item) => {
    const tagesSoll = item.plan / item.days; // Wie viele Autos pro Tag verkauft werden müssen
    const tagesIst = item.actual / item.days; // Wie viele tatsächlich verkauft wurden

    // const pastdays = 15;
    let zielErreichungHeute = (tagesIst / tagesSoll) * 100;
    zielErreichungHeute = Math.floor(zielErreichungHeute * 100) / 100; 

    const zielErreichungMonat = (item.actual / item.plan) * 100; // Monatsfortschritt

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
        <td className={zielErreichungHeute >= 100 ? "goal-achieved" : "goal-missed"}>
          {zielErreichungHeute.toFixed(2)}%
        </td>
        <td className={zielErreichungMonat >= 100 ? "goal-achieved" : "goal-missed"}>
          {zielErreichungMonat.toFixed(2)}%
        </td>
        <td>
        <button onClick={() => deleteSale(item._id)}>🗑️ Löschen</button>
        </td>
        
      </tr>
      
    );
  })
) : (
  <tr><td colSpan="8">Keine Daten verfügbar</td></tr> // Optional: Anzeige, wenn keine Daten vorliegen
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