export const getStatusColor = (status) => {
  const colors = {
    new: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    promoted: "bg-purple-100 text-purple-800",
    closed: "bg-green-100 text-green-800",
    lost: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};
