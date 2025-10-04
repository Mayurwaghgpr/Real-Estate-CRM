import React from "react";

const DealsMiniKanban = () => {
  const stages = {
    Qualification: ["Lead 1", "Lead 2"],
    Negotiation: ["Lead 3"],
    "Closed Won": ["Lead 4"],
  };

  return (
    <div className="p-4 rounded-xl border ">
      <h2 className="text-lg font-semibold mb-4">Deals Overview</h2>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(stages).map(([stage, deals]) => (
          <div key={stage} className="p-3 rounded-lg">
            <h3 className="font-medium  mb-2">{stage}</h3>
            {deals.map((d, i) => (
              <p key={i} className="text-sm px-2 opacity-50 py-1 rounded">
                {d}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsMiniKanban;
