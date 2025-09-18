import React, { useEffect, useMemo } from "react";
import TableFrame from "../../components/table/TableFrame";
import TableRow from "../../components/table/TableRow";
import useLeadsService from "../../services/useLeadsService";
import PaginationControls from "../../components/table/PaginationControls";
import { useDispatch, useSelector } from "react-redux";
import { setLeadPage, setLeadsSearch } from "../../store/leadsSlice";
import TableCell from "../../components/table/TableCell";
import LinkBtn from "../../components/buttons/LinkBtn";
import CommonBtn from "../../components/buttons/CommonBtn";
import useIcon from "../../hooks/useIcon";
import { useNavigate } from "react-router";
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";
import CommonInput from "../../components/input/CommonInput";
function LeadsList() {
  const { fetchLeads, toggelDisposeLead, exportBulkLeads } = useLeadsService();
  const { leads, search, page, limit, totalPages, isLeadsLoading } =
    useSelector((state) => state.leads);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const icons = useIcon();
  const leadsColumn = useMemo(
    () => [
      { title: <input type="checkbox" />, key: "selector" },
      { title: "Name", key: "name" },
      { title: "Mobile Number", key: "mobileNumber" },
      { title: "email", key: "email" },
      { title: "source", key: "source" },
      { title: "status", key: "status" },
      // { title: "interestedIn", key: "interestedIn" },
      { title: "assignedTo", key: "assignedTo" },
      { title: "Action", key: "action" },
    ],
    []
  );
  const handelPrevPage = () => {
    if (page > 1) dispatch(setLeadPage(page - 1));
  };
  const handelNextPage = () => {
    if (page < totalPages) dispatch(setLeadPage(page + 1));
  };
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddFolloup = (id) => {
    navigate("followup/" + id);
  };
  const handelDisposeLead = (id, isDispose) => {
    toggelDisposeLead({ id, isDispose });
  };

  return (
    <div className=" space-y-3 w-full border-inherit">
      <CommonHeader
        title={"Leads list"}
        subTitle={"Manage view, edit, dispose"}
        className={"flex justify-between w-full"}
      ></CommonHeader>
      <div className="border-inherit space-y-3">
        <div className="flex justify-between items-center w-full border-inherit">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
            Total of {leads.length} leads found
          </div>
          <div className="flex justify-center items-center gap-2 pr-4 w-fit border-inherit">
            <div className="flex items-center justify-center gap-2">
              <LinkBtn
                stub={"import"}
                className={"border  rounded-lg text-nowrap"}
              >
                Bulk import{" "}
              </LinkBtn>
              <CommonBtn
                action={exportBulkLeads}
                className={"border rounded-lg text-nowrap"}
              >
                Bulk export{" "}
              </CommonBtn>
            </div>
            <CommonInput
              className="w-fit py-2 px-4 "
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => dispatch(setLeadsSearch(e.target.value))}
            />
          </div>
        </div>

        <WrapperContainer>
          <TableFrame
            className="border rounded-lg"
            columns={leadsColumn}
            isLoading={isLeadsLoading}
            emptyMessage="No leads found"
          >
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>
                  <LinkBtn
                    stub={`lead/profile/${lead?._id}`}
                    className={"text-gray-500 w-fit"}
                    title="view profile"
                  >
                    {lead.name}
                  </LinkBtn>
                </TableCell>
                <TableCell>{lead.mobileNumber}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.status}</TableCell>
                {/* <TableCell>{lead?.intrestedIn?.join(",")}</TableCell> */}
                <TableCell>{lead?.assignedTo?.userName}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2 text-sm">
                    {/* <LinkBtn
                      stub={`lead/profile/${lead?._id}`}
                      className={"text-gray-500 w-fit"}
                      title="view profile"
                    >
                      {icons["eye"]}
                    </LinkBtn> */}

                    <CommonBtn
                      action={() => handleAddFolloup(lead._id)}
                      className={"text-gray-500 w-fit"}
                      tooltip="add followup"
                    >
                      {icons["followup"]}
                    </CommonBtn>
                    <CommonBtn
                      action={() => handelDisposeLead(lead._id, lead.isDispose)}
                      className={"text-red-500 w-fit rounded-lg"}
                      tooltip="dispose"
                    >
                      {icons["disposeIn"]}
                    </CommonBtn>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableFrame>
        </WrapperContainer>
      </div>
      <PaginationControls
        className={" justify-end w-full "}
        page={page}
        totalPages={totalPages}
        onNext={handelNextPage}
        onPrev={handelPrevPage}
      />
    </div>
  );
}

export default LeadsList;
