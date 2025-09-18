import React from "react";

const LeadExportButtons = () => {
  const handleExport = async (type) => {
    const url = `/api/leads/export/${type}`; // csv or excel
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("Error exporting leads");
      return;
    }

    // Convert response into a blob
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = type === "csv" ? "leads.csv" : "leads.xlsx";
    link.click();
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleExport("csv")}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Export CSV
      </button>

      <button
        onClick={() => handleExport("excel")}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Export Excel
      </button>
    </div>
  );
};

export default LeadExportButtons;
