import React, { useEffect, useMemo } from "react";
import TableFrame from "../../components/table/TableFrame";
import TableRow from "../../components/table/TableRow";
import useLeadsService from "../../services/useLeadsService";
import PaginationControls from "../../components/table/PaginationControls";
import { useDispatch, useSelector } from "react-redux";
import { setLeadPage, setLeads, setLeadsSearch } from "../../store/leadsSlice";
import TableCell from "../../components/table/TableCell";
import CommonBtn from "../../components/buttons/CommonBtn";
import useIcon from "../../hooks/useIcon";
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";
import CommonInput from "../../components/input/CommonInput";

function DisposedLeadsList() {
  const { fetchDisposedLeads, toggelDisposeLead } = useLeadsService();
  const { leads, search, page, limit, totalPages, isLeadsLoading } =
    useSelector((state) => state.leads);
  const dispatch = useDispatch();
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
    fetchDisposedLeads();
  }, []);

  const handelDisposeLead = (id, isDispose) => {
    toggelDisposeLead({ id, isDispose });
  };
  return (
    <div className=" space-y-3 w-full border-inherit">
      <CommonHeader
        title="Disposed Leads"
        subTitle="Manage and review disposed leads"
      />
      <div className="border-inherit space-y-3 borih">
        <div className="flex justify-between items-center w-full border-inherit">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
            Total of {leads.length} disposed leads found
          </div>
          <div className="flex justify-center items-center gap-3 border-inherit">
            <CommonInput
              className="px-4 py-2"
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
            {leads.length > 0 &&
              leads.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.mobileNumber}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead?.assignedTo?.userName}</TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center gap-2 text-sm">
                      <CommonBtn
                        action={() =>
                          handelDisposeLead(lead._id, lead.isDispose)
                        }
                        className={"text-green-500 w-fit rounded-lg "}
                        tooltip="restore"
                      >
                        {icons["disposeOut"]}
                      </CommonBtn>
                      <CommonBtn
                        action={() =>
                          handelDisposeLead(lead._id, lead.isDispose)
                        }
                        className={"text-red-500 w-fit rounded-lg "}
                        tooltip="delete"
                      >
                        {icons["delete"]}
                      </CommonBtn>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableFrame>
        </WrapperContainer>
      </div>
      <PaginationControls
        className={" justify-end w-full border-inherit "}
        page={page}
        totalPages={totalPages}
        onNext={handelNextPage}
        onPrev={handelPrevPage}
      />
    </div>
  );
}

export default DisposedLeadsList;
