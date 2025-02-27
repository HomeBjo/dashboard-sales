/**
 * API-Utility-Funktionen für den Zugriff auf Verkaufsdaten.
 * Diese Funktionen rufen Endpunkte des Backends auf und geben die Daten zurück.
 */
// const BASE_URL = "https://dashboard-sales-production.up.railway.app/api/sales";

//loakle entwicklung
const BASE_URL = "http://localhost:5000/api/sales";


/**
 * Holt alle Verkaufsdaten von der API.
 * @async
 * @function fetchSales
 * @returns {Promise<Object[]>} - Array mit allen Verkaufsdatensätzen.
 */
export const fetchSales = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error(`Fehler: ${response.status} ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("API Fehler:", error);
      return [];
    }
  };


  /**
 * Löscht einen Verkaufsdatensatz basierend auf der ID.
 * @async
 * @function deleteSale
 * @param {string} id - Die ID des Verkaufsdatensatzes, der gelöscht werden soll.
 * @returns {Promise<boolean>} - `true`, wenn erfolgreich, `false` bei Fehler.
 */
export const deleteSale = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Fehler: ${response.status} ${response.statusText}`);
      return true;
    } catch (error) {
      console.error("Löschfehler:", error);
      return false;
    }
  };