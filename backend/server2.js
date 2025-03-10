require("dotenv").config();
const express = require("express");
const cors = require("cors");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const USE_DUMMY_DATA = process.env.USE_DUMMY_DATA === "true";

app.use(cors({
  origin: ["https://dashboard.xn--bjrnteneicken-jmb.de", "http://localhost:3000"],
  methods: "GET,POST,DELETE,PUT",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());

// Dummy-Modus Check
if (USE_DUMMY_DATA) {
  console.log("⚠️ Dummy-Modus aktiviert: Backend nutzt nur lokale Dummy-Daten.");
} else {
  console.log("✅ Verbinde mit MongoDB...");
  const mongoose = require("mongoose");

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB verbunden!"))
  .catch(err => console.error("❌ MongoDB Fehler:", err));
}

// API-Routen registrieren (egal ob Dummy oder MongoDB)
app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
