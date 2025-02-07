// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Dashboard from "./components/dashboard";
import Header from "./components/header";
import Footer from "./components/footer";

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
