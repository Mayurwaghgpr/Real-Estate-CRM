import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useFolloupsService from "../../services/useFolloupsService";
import useIcon from "../../hooks/useIcon";
import useTeamService from "../../services/useTeamService";
import { setLeadPage } from "../../store/leadsSlice";
import AuthorizedOnly from "../../components/utils/AuthorizedOnly";
import CommonSelect from "../../components/input/CommonSelect";
import {
  setFolloupsAssginedTo,
  setFolloupsStatus,
} from "../../store/followupsSlice";
import WrapperContainer from "../../components/WrapperContainer";
import TableFrame from "../../components/table/TableFrame";
import TableRow from "../../components/table/TableRow";
import CommonBtn from "../../components/buttons/CommonBtn";
import LinkBtn from "../../components/buttons/LinkBtn";
import PaginationControls from "../../components/table/PaginationControls";
import ConfirmationBox from "../../components/utils/ConfirmationBox";
import TableCell from "../../components/table/TableCell";
import { formatDate } from "../../utils/formatedDate";

function FolloupsList() {
  const {
    followups,
    totalFollowupsPages,
    page,
    isFollowupsLoading,
    status,
    assignedTo,
  } = useSelector((state) => state.followups);
  const { agents } = useSelector((state) => state.team);

  const [showConfirmBox, setShowConfirmBox] = useState({
    status: false,
    id: "",
  });
  const { fetchFollowups, deleteFolloups } = useFolloupsService();
  const { fetchAllAgents } = useTeamService();
  const dispatch = useDispatch();
  const icons = useIcon();

  useEffect(() => {
    fetchAllAgents();
  }, []);

  useEffect(() => {
    fetchFollowups();
  }, [page, status, assignedTo]);

  const followupsColumns = [
    { title: <input type="checkbox" />, key: "select" },
    { title: "Lead", key: "leadName" },
    {
      title: "Follow-up Date",
      key: "dueDate",
    },
    { title: "Notes", key: "notes" },
    { title: "Assigned To", key: "assignedTo.name" },
    {
      title: "Status",
      key: "status",
    },
    { title: "Type", key: "type" },
    { title: "Priority", key: "priority" },

    {
      title: "Actions",
      key: "actions",
    },
  ];

  const handelPrevPage = () => {
    if (page > 1) dispatch(setLeadPage(page - 1));
  };

  const handelNextPage = () => {
    if (page < totalPages) dispatch(setLeadPage(page + 1));
  };
  const handleDelete = () => {
    deleteFolloups(showConfirmBox.id).finally(() => {
      setShowConfirmBox({ id: "", status: false });
    });
  };
  return (
    <>
      {" "}
      <div className="flex justify-between items-center border-inherit">
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
          Total of {followups?.length} followups found
        </div>
        <div className="border-inherit flex gap-4 items-center  w-fit">
          <AuthorizedOnly>
            {" "}
            <CommonSelect
              className="border rounded w-fit"
              value={assignedTo}
              name={"Agent "}
              onChange={(e) => dispatch(setFolloupsAssginedTo(e.target.value))}
              options={agents?.map((ag) => ({
                label: ag.userName,
                value: ag._id,
              }))}
            />
          </AuthorizedOnly>
          <CommonSelect
            className="border rounded p-2"
            name={"Status"}
            value={status}
            onChange={(e) => dispatch(setFolloupsStatus(e.target.value))}
            options={[
              { value: "all", label: "All" },
              { value: "Pending", label: "Pending" },
              { value: "overdue", label: "Overdue" },
              { value: "completed", label: "Completed" },
            ]}
          />
        </div>
      </div>
      {/* Table using TableFrame */}
      <WrapperContainer className={"border-inherit"}>
        <TableFrame
          columns={followupsColumns}
          isLoading={isFollowupsLoading}
          emptyMessage="No folloups found"
          className="border-inherit"
        >
          {followups?.map((followup) => (
            <TableRow>
              <TableCell>
                <input type="checkbox" name="" id="" />
              </TableCell>
              <TableCell>{followup.lead.name}</TableCell>
              <TableCell>{formatDate(followup.followupsDate)}</TableCell>
              <TableCell>{followup.description}</TableCell>
              <TableCell>{followup.assignedTo.userName}</TableCell>
              <TableCell>
                {
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      followup.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : new Date(followup.followupsDate) < new Date()
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {followup.status}
                  </span>
                }
              </TableCell>
              <TableCell>{followup.type}</TableCell>
              <TableCell>{followup.priority}</TableCell>
              <TableCell>
                {" "}
                <div className="flex gap-2">
                  {/* {f.status !== "done" && (
              <button
              //   onClick={() => markDone(f._id)}
              >
                <CheckCircle className="text-green-600" />
              </button>
            )} */}
                  <LinkBtn
                    stub={`update/${followup._id}`}
                    state={followup}
                    className={"text-blue-600"}
                  >
                    {icons["edit"]}
                  </LinkBtn>
                  <CommonBtn
                    action={() =>
                      setShowConfirmBox({ status: true, id: followup._id })
                    }
                    className={"text-red-600"}
                  >
                    {icons["delete"]}
                  </CommonBtn>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableFrame>
      </WrapperContainer>
      <PaginationControls
        className={"w-full flex justify-end"}
        onNext={handelNextPage}
        onPrev={handelPrevPage}
        page={page}
        totalPages={totalFollowupsPages}
      />
      <ConfirmationBox
        isOpen={showConfirmBox.status}
        title={"Confirm Delete Followup"}
        message={"Do you realy want to Delete ? "}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmBox({ status: false, id: "" })}
      />
    </>
  );
}

export default FolloupsList;
