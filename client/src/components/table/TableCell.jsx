const TableCell = ({
  className,
  children,
  align = "left",
  compact = false,
}) => {
  return (
    <td
      className={`
        text-sm text-gray-900
        ${compact ? "px-2 py-2" : "px-4 py-3"}
        ${
          align === "center"
            ? "text-center"
            : align === "right"
            ? "text-right"
            : "text-left"
        }
      ${className}`}
    >
      {children}
    </td>
  );
};

export default TableCell;
