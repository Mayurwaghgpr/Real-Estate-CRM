import React, { useCallback, useEffect } from "react";
import useIcon from "../../../hooks/useIcon";
import CommonInput from "../../../components/input/CommonInput";
import CommonSelect from "../../../components/input/CommonSelect";
import AuthorizedOnly from "../../../components/utils/AuthorizedOnly";
import { useSelector } from "react-redux";
import useTeamService from "../../../services/useTeamService";
import CancelBtn from "../../../components/buttons/CancelBtn";
import SaveBtn from "../../../components/buttons/SaveBtn";
import CommonHeader from "../../../components/header/CommonHeader";
import WrapperContainer from "../../../components/WrapperContainer";

function FollowupFormModel({
  isSubmitting,
  handleClose,
  handleChange,
  handleSubmit,
  data,
  heading,
  subHeading,
}) {
  const icons = useIcon();
  const { fetchAllAgents } = useTeamService();
  const { agents } = useSelector((state) => state.team);

  const handleFetchAgents = useCallback(() => {
    fetchAllAgents();
  }, []);

  useEffect(() => {
    handleFetchAgents();
  }, []);
  return (
    <div className=" space-y-6 border-inherit pb-10">
      {/* Header */}
      <CommonHeader className={" flex justify-between w-full border-inherit"}>
        <div className=" flex justify-center items-center gap-3 w-fit">
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-sm">
            {icons["clock"]}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{heading}</h2>
            <p className="text-sm">{subHeading}</p>
          </div>
        </div>
        <div></div>
      </CommonHeader>

      {/* Content */}
      <WrapperContainer className=" border-inherit">
        <form onSubmit={handleSubmit} className="space-y-6 border-inherit p-5">
          {/* Main Fields */}
          <div className="space-y-6 border-inherit">
            <CommonInput
              className={"py-2 px-4"}
              label="Title"
              name="title"
              value={data.title}
              onChange={handleChange}
              placeholder="Enter follow-up title"
              required
              disabled={isSubmitting}
            />
            <CommonInput
              className={"py-2 px-4"}
              label="Description"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Add detailed description..."
              disabled={isSubmitting}
            />
            <CommonInput
              className={"py-2 px-4"}
              label="Follow-Up Date"
              name="followupsDate"
              type="date"
              value={data.followupsDate ? data.followupsDate.split("T")[0] : ""}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
            <AuthorizedOnly>
              <CommonSelect
                className={"py-2 px-4"}
                label="Assign To"
                name="assignedTo"
                value={data.assignedTo._id || data.assignedTo}
                onChange={handleChange}
                disabled={isSubmitting}
                options={agents?.map((ag) => ({
                  label: ag.userName,
                  value: ag._id,
                }))}
              />{" "}
            </AuthorizedOnly>
          </div>

          {/* Settings Grid */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4 border-inherit">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center border-inherit">
              <span>{icons["settings"]}</span>
              Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-inherit">
              <CommonSelect
                label="Type"
                name="type"
                value={data.type}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                options={[
                  { label: " Email", value: "email" },
                  { label: " Message", value: "message" },
                  { label: " Call", value: "call" },
                  { label: " Meeting", value: "meeting" },
                ]}
              />

              <CommonSelect
                label="Status"
                name="status"
                value={data.status}
                onChange={handleChange}
                disabled={isSubmitting}
                options={[
                  { label: "Pending", value: "pending" },
                  { label: " Completed", value: "completed" },
                  { label: " Canceled", value: "canceled" },
                ]}
              />

              <CommonSelect
                label="Priority"
                name="priority"
                value={data.priority}
                onChange={handleChange}
                disabled={isSubmitting}
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <CancelBtn
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </CancelBtn>
            <SaveBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  {icons["spinner1"]}
                  Adding...
                </>
              ) : (
                <>
                  {icons["plus"]}
                  Add Follow-Up
                </>
              )}
            </SaveBtn>
          </div>
        </form>
      </WrapperContainer>
    </div>
  );
}

export default FollowupFormModel;
