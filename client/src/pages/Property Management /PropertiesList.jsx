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
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";

function PropertyList() {
  const dispatch = useDispatch();

  const {
    properties = [],
    search,
    statusFilter,
    page,
    totalPropertiesPage,
    isLoading,
  } = useSelector((state) => state.properties);
  const { fetchProperties, toggleArchiveProperty } = usePropertiesService();
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
    fetchProperties();
  }, [search, page, statusFilter]);

  const handlePrevPage = useCallback(() => {
    if (page > 1) dispatch(setPropertiesPage(page - 1));
  }, [page, dispatch]);

  const handleNextPage = useCallback(() => {
    if (page < totalPropertiesPage) dispatch(setPropertiesPage(page + 1));
  }, [page, totalPropertiesPage, dispatch]);
  const handleArchive = useCallback(
    async (id, isArchived) => {
      await toggleArchiveProperty(id, isArchived);
    },
    [toggleArchiveProperty]
  );
  return (
    <div className="space-y-3 w-full border-inherit">
      {/* Header */}
      <CommonHeader
        className={"justify-end w-full border-inherit"}
        title={"Properties List"}
        subTitle="Manage your properties"
      ></CommonHeader>
      {/* Table */}{" "}
      <div className="border-inherit space-y-3">
        <div className="flex justify-between items-center w-full border-inherit">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
            Total of {properties.length} Properties found
          </div>
          <div className="flex justify-center items-center gap-3 border-inherit">
            <CommonInput
              className="border-inherit py-3 px-4"
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
          </div>
        </div>
        <WrapperContainer>
          {" "}
          <TableFrame
            className="border rounded-lg"
            columns={columns}
            emptyMessage="No property found"
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
                          handleArchive(property._id, properties.isArchived)
                        }
                      >
                        {icons["archive"]}
                      </CommonBtn>
                      <LinkBtn
                        className={"text-blue-600 "}
                        stub={"edit_property"}
                        title={"edit property"}
                        state={property}
                      >
                        {icons["edit"]}
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

export default PropertyList;
