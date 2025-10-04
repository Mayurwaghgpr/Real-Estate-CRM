import { FaUserTie, FaHandshake, FaRupeeSign, FaClock } from "react-icons/fa";

const SummaryCards = () => {
  const cards = [
    { title: "Total Leads", value: 152, icon: <FaUserTie /> },
    { title: "Active Deals", value: 37, icon: <FaHandshake /> },
    { title: "Revenue Generated", value: "₹24.5L", icon: <FaRupeeSign /> },
    { title: "Today's Follow-ups", value: 8, icon: <FaClock /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="flex items-center gap-4  p-4 rounded-xl border  hover:scale-[1.02] transition-transform"
        >
          <div className="text-3xl text-purple-500">{card.icon}</div>
          <div>
            <p className=" opacity-50 text-sm">{card.title}</p>
            <h3 className="text-xl font-semibold ">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
