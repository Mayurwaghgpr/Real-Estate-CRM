import React from "react";
import { FiPhoneCall, FiMail, FiCalendar } from "react-icons/fi";

const FollowUpsWidget = () => {
  const followups = [
    { name: "Rajesh Kumar", type: "call", date: "Today 3:00 PM" },
    { name: "Sneha Patel", type: "email", date: "Tomorrow 11:00 AM" },
  ];

  const iconMap = {
    call: <FiPhoneCall className="text-green-400" />,
    email: <FiMail className="text-blue-400" />,
    meeting: <FiCalendar className="text-purple-400" />,
  };

  return (
    <div className="p-4 rounded-xl border ">
      <h2 className="text-lg font-semibold mb-4">Upcoming Follow-ups</h2>
      <ul className="space-y-3">
        {followups.map((f, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-black/10 p-3 rounded-lg"
          >
            <div className="flex gap-3 items-center">
              {iconMap[f.type]}
              <div>
                <p className=" opacity-50 font-medium">{f.name}</p>
                <p className="text-sm ">{f.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUpsWidget;
