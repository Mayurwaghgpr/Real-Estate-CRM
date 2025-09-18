import { useEffect } from "react";
import useFolloupsService from "../../services/useFolloupsService";
import { useSelector } from "react-redux";
import WrapperContainer from "../../components/WrapperContainer";
import { User, ArrowRight } from "lucide-react";
import useIcon from "../../hooks/useIcon";
import { formatDate } from "../../utils/formatedDate";

const TodaysFollowups = () => {
  const { fetchTodayFollowups } = useFolloupsService();

  const followups = useSelector((state) => state.followups.followups);
  const icons = useIcon();

  useEffect(() => {
    fetchTodayFollowups();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-600 border-red-200";
      case "medium":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "low":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-4 border-inherit">
      {/* Simple Header */}
      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
          <span className="text-blue-700 font-medium text-sm">
            Scheduled Follow-ups ({followups.length})
          </span>
        </div>
      </div>

      {/* Content */}
      {followups.length === 0 ? (
        <WrapperContainer className="  p-8 text-center  ">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-gray-400 mb-3 bg-gray-200 backdrop-blur-lg shadow-2xl p-4 text-2xl rounded-full">
              {icons["check"]}
            </div>
            <p className="text-gray-600 font-medium">All caught up!</p>
            <p className="text-gray-500 text-sm mt-1">
              No follow-ups for today
            </p>
          </div>
        </WrapperContainer>
      ) : (
        <div className="space-y-3 border-inherit">
          {followups.map((f) => (
            <WrapperContainer
              key={f._id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 leading-tight">
                    {f.title}
                  </h3>

                  {/* Details Row */}
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      {icons["user"]}
                      <span>{f.lead.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {icons["clock"]}
                      <span>{formatDate(f.followupsDate)}</span>
                    </div>
                  </div>
                </div>

                {/* Priority Badge */}
                {f.priority && (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                      f.priority
                    )} flex-shrink-0`}
                  >
                    {f.priority}
                  </span>
                )}
              </div>
            </WrapperContainer>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysFollowups;
