const mongoose = require("mongoose");


/**
 * Definiert das Schema für die Verkaufsdaten.
 * @typedef {Object} Sale
 * @property {string} month - Name des Monats.
 * @property {number} plan - Geplante Verkaufszahlen.
 * @property {number} actual - Tatsächliche Verkaufszahlen.
 * @property {number} days - Anzahl der verfügbaren Arbeitstage.
 */
const SalesSchema = new mongoose.Schema({
    month: String,
    plan: Number,
    actual: Number,
    days: Number
  });

  /** Erstellt ein Mongoose-Modell für die Verkaufsdaten. */
  const Sales = mongoose.model("Sales", SalesSchema);
  module.exports = Sales;

