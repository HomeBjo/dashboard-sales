import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="plan" fill="#8884d8" name="Plan-Zahl" />
        <Bar dataKey="actual" fill="#82ca9d" name="Ist-Zahl" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
