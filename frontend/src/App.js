import React from "react";
import Dashboard from "./components/dashboard/dashboard";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
