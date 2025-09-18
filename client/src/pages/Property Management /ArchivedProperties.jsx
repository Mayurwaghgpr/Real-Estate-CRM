import { useCallback, useEffect } from "react";
import {
  setPropertiesPage,
  setPropertiesSearch,
  setStatusFilter,
} from "../../store/propertiesSlice";
import { useDispatch, useSelector } from "react-redux";
import TableFrame from "../../components/table/TableFrame";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import PaginationControls from "../../components/table/PaginationControls";
import CommonInput from "../../components/input/CommonInput";
import usePropertiesService from "../../services/usePropertiesService";
import useIcon from "../../hooks/useIcon";
import CommonSelect from "../../components/input/CommonSelect";
import LinkBtn from "../../components/buttons/LinkBtn";
import CommonBtn from "../../components/buttons/CommonBtn";
import WrapperContainer from "../../components/WrapperContainer";
import CommonHeader from "../../components/header/CommonHeader";

function ArchivedProperties() {
  const dispatch = useDispatch();

  const {
    properties = [],
    search,
    statusFilter,
    page,
    totalPropertiesPage,
    isLoading,
  } = useSelector((state) => state.properties);
  const { fetchArchivedProperties, toggleArchiveProperty } =
    usePropertiesService();
  const icons = useIcon();

  const columns = [
    { title: <input type="checkbox" />, key: "selector" },
    { title: "Title", key: "title" },
    { title: "Listing Type", key: "listingType" },
    { title: "Category", key: "category" },
    { title: "Location", key: "location" },
    { title: "Price", key: "price" },
    { title: "Status", key: "status" },
    { title: "Action", key: "action" },
  ];

  useEffect(() => {
    fetchArchivedProperties();
  }, [search, page, statusFilter]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) dispatch(setPropertiesPage(page - 1));
  }, [page, dispatch]);

  const handleNextPage = useCallback(() => {
    if (page < totalPropertiesPage) dispatch(setPropertiesPage(page + 1));
  }, [page, totalPropertiesPage, dispatch]);

  const handleArchive = useCallback(
    async (id, isArchived) => {
      console.log({ isArchived });
      await toggleArchiveProperty(id, isArchived);
    },
    [toggleArchiveProperty]
  );

  return (
    <div className="space-y-3 w-full border-inherit">
      {/* Header */}
      <CommonHeader title="Archived Properties"></CommonHeader>

      {/* Table */}
      <div className="border-inherit space-y-3">
        <div className="flex justify-between items-center w-full border-inherit">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
            Total of {properties.length} archived properties found
          </div>
          <div className="flex justify-center items-center gap-3 border-inherit">
            <CommonInput
              className="py-3 px-4"
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => dispatch(setPropertiesSearch(e.target.value))}
            />
            <CommonSelect
              className
              name={"status"}
              value={statusFilter}
              options={["available", "under-offer", "sold", "rented"]}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
            />
          </div>{" "}
        </div>
        <WrapperContainer>
          <TableFrame
            className="border rounded-lg"
            columns={columns}
            emptyMessage="           No properties found"
            isLoading={isLoading}
          >
            {properties.length > 0 &&
              properties.map((property) => (
                <TableRow key={property.id || property._id}>
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>
                  <TableCell>
                    <LinkBtn stub={"property/details/" + property._id}>
                      {" "}
                      {property.title}
                    </LinkBtn>
                  </TableCell>
                  <TableCell>{property.listingType}</TableCell>
                  <TableCell>{property.category}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.price}</TableCell>
                  <TableCell>{property.status}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <CommonBtn
                        action={() =>
                          handleArchive(property._id, property.isArchived)
                        }
                      >
                        {icons["unarchive"]}
                      </CommonBtn>
                      <LinkBtn
                        className={"text-red-500 "}
                        stub={"edit_property"}
                        title={"edit property"}
                        state={property}
                      >
                        {icons["delete"]}
                      </LinkBtn>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableFrame>
        </WrapperContainer>
      </div>
      {/* Pagination */}
      <PaginationControls
        className="justify-end w-full"
        page={page}
        totalPages={totalPropertiesPage}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
    </div>
  );
}

export default ArchivedProperties;
