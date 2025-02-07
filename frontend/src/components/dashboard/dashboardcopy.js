import React, { useState, useEffect } from "react";
import salesData from "../../data/salesData.json";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(salesData);
  }, []);

  return (
    <div>
      <h1>🚗 Verkaufs-Dashboard</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Monat</th>
            <th>Plan-Zahl</th>
            <th>Ist-Zahl</th>
            <th>Arbeitstage</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.plan}</td>
              <td>{item.actual}</td>
              <td>{item.days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
