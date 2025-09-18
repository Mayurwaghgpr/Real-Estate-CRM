export const getStageColor = (stage) => {
  const colors = {
    contacted: "bg-blue-100 text-blue-800",
    site_visit: "bg-yellow-100 text-yellow-800",
    negotiation: "bg-orange-100 text-orange-800",
    proposal_sent: "bg-purple-100 text-purple-800",
    deal_closed: "bg-green-100 text-green-800",
  };
  return colors[stage] || "bg-gray-100 text-gray-800";
};
