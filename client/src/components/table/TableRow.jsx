// Table Row Component
const TableRow = ({
  children,
  index = 0,
  striped = true,
  hover = true,
  className,
  ...props
}) => {
  return (
    <tr
      className={`w-full
        border-b border-inherit last:border-b-0
        ${striped && index % 2 === 1 ? "bg-gray-50" : "bg-white"}
        ${hover ? "hover:bg-gray-100" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
