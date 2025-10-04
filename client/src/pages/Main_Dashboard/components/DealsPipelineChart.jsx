import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [
  { stage: "Qualification", deals: 10 },
  { stage: "Negotiation", deals: 7 },
  { stage: "Proposal Sent", deals: 5 },
  { stage: "Closed Won", deals: 3 },
];

const DealsPipelineChart = () => (
  <div className="p-4 rounded-xl border ">
    <h2 className="text-lg font-semibold  mb-4">Deals Pipeline</h2>
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: "band", dataKey: "stage" }]}
      series={[{ dataKey: "deals", color: "#8b5cf6" }]}
      borderRadius={6}
      width={400}
      height={300}
    />
  </div>
);

export default DealsPipelineChart;
