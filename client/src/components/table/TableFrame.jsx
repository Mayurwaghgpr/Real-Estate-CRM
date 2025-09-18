import React, { Children, cloneElement } from "react";
import TableShimmer from "../loaders/TableShimmer";

// Table Container Component
const TableFrame = ({
  columns = [],
  compact = false,
  className = "",
  emptyMessage = "No data available",
  isLoading,
  children,
}) => {
  return (
    <div className={`${className} overflow-x-auto border-inherit  `}>
      <table className="min-w-full border-inherit rounded-xl h-full">
        <thead className="border-inherit ">
          <tr className="bg-gray-50 border-b border-inherit">
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={`
                  text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${compact ? "px-2 py-2" : "px-4 py-3"}
                `}
              >
                {column.title || column.header || column.key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-inherit">
          {isLoading ? (
            <TableShimmer rows={3} columns={columns.length} />
          ) : (
            children
          )}
        </tbody>
      </table>
      {!isLoading && !children && (
        <div className="flex justify-center text-center items-center w-full p-8">
          <span className="m-auto">{emptyMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TableFrame;
