import React from "react";

const TableShimmer = ({ rows = 5, columns = 4 }) => {
  return [...Array(rows)].map((_, rowIndex) => (
    <tr key={rowIndex} className="border-b border-inherit">
      {[...Array(columns)].map((_, colIndex) => (
        <td key={colIndex} className="p-3">
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
        </td>
      ))}
    </tr>
  ));
};

export default TableShimmer;
