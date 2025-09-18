import React, { useEffect, useMemo } from "react";
import TableRow from "../../components/table/TableRow";
import TableFrame from "../../components/table/TableFrame";
import TableCell from "../../components/table/TableCell";
import useTeamService from "../../services/useTeamService";
import { useSelector, useDispatch } from "react-redux";
import { setPage, setSearch } from "../../store/teamSlice";
import PaginationControls from "../../components/table/PaginationControls";
import CommonInput from "../../components/input/CommonInput";
import WrapperContainer from "../../components/WrapperContainer";
import CommonHeader from "../../components/header/CommonHeader";

function UserTable() {
  const dispatch = useDispatch();
  const { fetchAgents } = useTeamService();
  const { agents, page, totalPages, search, isUsersLoading } = useSelector(
    (state) => state.team
  );

  // Fetch when page or search changes
  useEffect(() => {
    fetchAgents();
  }, [page, search]);

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(setPage(1)); // Reset to first page on new search
  };

  const agentColumn = useMemo(
    () => [
      { title: <input type="checkbox" />, key: "selector" },
      { title: "Name", key: "userName" },
      { title: "Email", key: "email" },
      { title: "Mobile Number", key: "mobileNumber" },
      { title: "Role", key: "role" },
      { title: "Action", key: "action" },
    ],
    []
  );

  return (
    <div className="space-y-3 w-full border-inherit">
      {/* Search Input */}
      <CommonHeader title="User Management">
        <div className="flex justify-end w-full border-inherit ">
          <CommonInput
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search agents..."
            className="border px-3 py-1 w-fit rounded-md"
          />
        </div>
      </CommonHeader>

      {/* Table */}
      <WrapperContainer>
        <TableFrame
          className="border rounded-lg"
          columns={agentColumn}
          isLoading={isUsersLoading}
          emptyMessage="No User found"
        >
          {agents.length > 0 &&
            agents.map((agent, idx) => (
              <TableRow key={agent._id || idx}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{agent.userName}</TableCell>
                <TableCell>{agent.email}</TableCell>
                <TableCell>{agent.mobileNumber}</TableCell>
                <TableCell>{agent.role}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
        </TableFrame>
      </WrapperContainer>

      {/* Pagination Controls */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        className={" justify-end w-full"}
      />
    </div>
  );
}

export default UserTable;
