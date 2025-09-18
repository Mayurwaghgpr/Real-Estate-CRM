import CommonBtn from "../../../components/buttons/CommonBtn";
import useIcon from "../../../hooks/useIcon";
import { formatDate } from "../../../utils/formatedDate";
import { getStageColor } from "../../../utils/getStageColor";

const DealHistory = ({ isOpen, toggle, history, currentStage }) => {
  const icons = useIcon();

  const getActionColor = (action) => {
    const actionColors = {
      CLOSED: "bg-red-100 text-red-800 border-red-200",
      REOPENED: "bg-green-100 text-green-800 border-green-200",
      UPDATED: "bg-blue-100 text-blue-800 border-blue-200",
      CREATED: "bg-purple-100 text-purple-800 border-purple-200",
      STAGE_CHANGED: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return actionColors[action] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getActionDate = (historyItem) => {
    // Use the most appropriate date field based on action type
    return (
      historyItem.actionDate ||
      historyItem.reopenedAt ||
      historyItem.updatedAt ||
      historyItem.createdAt
    );
  };

  const getActionIcon = (action) => {
    const actionIcon = action.toLowerCase();
    return icons[actionIcon] || icons["default"] || "📝";
  };
  console.log({ history });
  return (
    <div className="rounded-lg w-full text-start border border-inherit overflow-hidden">
      {/* Modal Header */}
      <div className="flex justify-between items-center p-5 border-b border-inherit text-white bg-gray-600">
        <h2 className="text-xl font-semibold">Deal stage History log</h2>
        <CommonBtn action={toggle} className="text-2xl font-bold">
          {isOpen ? icons["arrowup"] : icons["arrowdown"]}
        </CommonBtn>
      </div>

      {/* Modal Content */}
      <div
        className={`overflow-y-auto border-inherit ${
          isOpen ? "max-h-[calc(80vh-80px)] p-5" : "h-0"
        }`}
      >
        {history && history.length > 0 ? (
          <div className="space-y-4 border-inherit">
            {history.map((historyItem, index) => (
              <div
                key={historyItem.id || index}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {getActionIcon(historyItem.action)}
                    </div>
                    <div>
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold border ${getActionColor(
                          historyItem.action
                        )}`}
                      >
                        {historyItem.action.replace("_", " ")}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(getActionDate(historyItem))}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 ml-9">
                  {/* Stage Change Information */}
                  {historyItem.previousStage && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 font-medium">
                        Previous Stage:
                      </span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${getStageColor(
                            historyItem.previousStage
                          )}`}
                        >
                          {historyItem.previousStage
                            ?.replace("_", " ")
                            .toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action performed by */}
                  {(historyItem.reopenedBy ||
                    historyItem.actionBy ||
                    historyItem.updatedBy) && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 font-medium">
                        Action by:
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {historyItem.reopenedBy?.userName ||
                          historyItem.reopenedBy}
                      </span>
                    </div>
                  )}

                  {/* Value changes */}
                  {historyItem.valueChanges && (
                    <div className="space-y-2">
                      <span className="text-sm text-gray-600 font-medium block">
                        Value Changes:
                      </span>
                      {Object.entries(historyItem.valueChanges).map(
                        ([field, change]) => (
                          <div
                            key={field}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <span className="text-gray-600 capitalize">
                              {field.replace(/([A-Z])/g, " $1")}:
                            </span>
                            <span className="text-red-600 line-through">
                              {change.from}
                            </span>
                            <span className="text-gray-400">→</span>
                            <span className="text-green-600 font-medium">
                              {change.to}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Notes */}
                  {historyItem.notes && (
                    <div>
                      <span className="text-sm text-gray-600 font-medium block mb-2">
                        Notes:
                      </span>
                      <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700 border-l-4 border-blue-200">
                        {historyItem.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" flex flex-col justify-center items-center text-center py-12 ">
            <span className="text-6xl mb-4">{icons["note"]}</span>
            <h3 className="text-x l font-semibold text-gray-800 mb-2">
              No History Available
            </h3>
            <p className="text-gray-600">
              This deal doesn't have any recorded history yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealHistory;
