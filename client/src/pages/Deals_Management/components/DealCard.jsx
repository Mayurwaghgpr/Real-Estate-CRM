import { Draggable } from "@hello-pangea/dnd";
import LinkBtn from "../../../components/buttons/LinkBtn";
import CommonBtn from "../../../components/buttons/CommonBtn";
import useIcon from "../../../hooks/useIcon";
import React from "react";

const DealCard = React.memo(({ deal, index, handleEdit }) => {
  const icons = useIcon();

  return (
    <Draggable
      key={deal.id}
      draggableId={deal.id}
      index={index}
      isDragDisabled={
        deal.stage === "closed_won" || deal.stage === "closed_lost"
      }
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg p-4 border transition-all duration-200 ${
            snapshot.isDragging
              ? "shadow-lg scale-105 border-blue-300"
              : "hover:shadow-md border-gray-200"
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2">
              {deal.title}
            </h3>
            <div className="flex-shrink-0">{icons["drag"]}</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-green-700">
              ₹
              {(deal.finalValue ?? deal.expectedValue ?? 0).toLocaleString(
                "en-IN"
              )}
            </span>
            <div className="flex items-center justify-center gap-1">
              <LinkBtn
                className={"rounded-full text-sm"}
                stub={`deal/${deal.id}/details`}
                tooltip="Re-open deal"
                state={deal}
              >
                {icons["info"]}
              </LinkBtn>
              {deal.stage === "closed_won" || deal.stage === "closed_lost" ? (
                <LinkBtn
                  className={"rounded-full text-red-500"}
                  stub={`deal/${deal.id}/reopen`}
                  tooltip="Re-open deal"
                  state={deal}
                >
                  {icons["refresh"]}
                </LinkBtn>
              ) : (
                <CommonBtn action={() => handleEdit(deal)}>
                  {icons["edit"]}
                </CommonBtn>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
});

export default DealCard;
