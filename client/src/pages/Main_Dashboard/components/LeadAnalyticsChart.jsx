import { PieChart } from "@mui/x-charts/PieChart";

const data = [
  { id: 0, value: 45, label: "Website" },
  { id: 1, value: 30, label: "Referral" },
  { id: 2, value: 25, label: "Walk-in" },
];

const COLORS = ["#8b5cf6", "#06b6d4", "#10b981"];

const LeadAnalyticsChart = () => (
  <div className="p-4 rounded-xl border border-inherit">
    <h2 className="text-lg font-semibold  mb-4">Leads by Source</h2>
    <PieChart
      series={[
        {
          data,
          innerRadius: 40,
          outerRadius: 100,
          arcLabel: (item) => `${item.label} (${item.value}%)`,
          arcLabelMinAngle: 20,
        },
      ]}
      colors={COLORS}
      width={400}
      height={300}
    />
  </div>
);

export default LeadAnalyticsChart;
