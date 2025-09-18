import React, { useEffect } from "react";
import useFolloupsService from "../../services/useFolloupsService";
import { useSelector } from "react-redux";

const UpcomingFollowups = () => {
  const { fetchUpcommingFollowups } = useFolloupsService();
  const followups = useSelector((state) => state.followups.followups) || [];
  useEffect(() => {
    fetchUpcommingFollowups();
  }, []);

  return (
    <div className=" border-inherit ">
      <h2 className="text-lg font-semibold mb-3">Upcoming Follow-ups</h2>
      {followups?.length === 0 ? (
        <p className="text-sm text-gray-500">No upcoming follow-ups</p>
      ) : (
        <ul className="space-y-2 border-inherit">
          {followups?.map((f) => (
            <li
              key={f._id}
              className="flex justify-between items-center p-4 border rounded-lg border-inherit hover:bg-gray-50"
            >
              <div>
                <p className="font-medium">{f.title}</p>
                <p className="text-xs text-gray-500">{f.lead.name}</p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(f.dueDate).toLocaleDateString()} •{" "}
                {new Date(f.dueDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingFollowups;
