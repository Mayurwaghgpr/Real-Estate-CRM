// components/DealsKanban.jsx
import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";

import useDealsService from "../../services/useDealsService";
import {
  resetFilters,
  setAssignedTo,
  setDealsColumns,
  setEndDate,
  setMaxValue,
  setMinValue,
  setPropertyId,
  setStartDate,
} from "../../store/dealsSlice";
import useIcon from "../../hooks/useIcon";
import EditDealPopup from "./EditDealPopup";
import CommonHeader from "../../components/header/CommonHeader";
import ConfirmationBox from "../../components/utils/ConfirmationBox";

import CommonSelect from "../../components/input/CommonSelect";
import useTeamService from "../../services/useTeamService";
import usePropertiesService from "../../services/usePropertiesService";
import CommonInput from "../../components/input/CommonInput";
import CancelBtn from "../../components/buttons/CancelBtn";
import DealCard from "./components/DealCard";

export default function DealsKanban() {
  const stages = useSelector((state) => state.deals.stages);
  const columns = useSelector((state) => state.deals.columns);
  const assignedTo = useSelector((state) => state.deals.assignedTo);
  const propertyId = useSelector((state) => state.deals.propertyId);
  const startDate = useSelector((state) => state.deals.startDate);
  const endDate = useSelector((state) => state.deals.endDate);
  const minValue = useSelector((state) => state.deals.minValue);
  const maxValue = useSelector((state) => state.deals.maxValue);
  const isDealSubmitting = useSelector((state) => state.deals.isDealSubmitting);

  const { agents } = useSelector((state) => state.team);
  const { properties } = useSelector((state) => state.properties);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [showConfirmBox, setShowConfirmBox] = useState({
    status: false,
    data: {},
  });

  const dispatch = useDispatch();
  const icons = useIcon();

  const { fetchBoard, updateStage, reopenDeal } = useDealsService();
  const { fetchAllAgents } = useTeamService();
  const { fetchAllProperties } = usePropertiesService();
  useEffect(() => {
    fetchAllAgents();
    fetchAllProperties();
  }, []);
  useEffect(() => {
    fetchBoard();
  }, [propertyId, startDate, endDate, minValue, maxValue, assignedTo]);

  const columnTotals = useMemo(() => {
    const totals = {};
    stages.forEach((s) => {
      const list = columns[s] || [];
      totals[s] = list.reduce(
        (sum, d) => sum + (d.finalValue ?? d.expectedValue ?? 0),
        0
      );
    });
    return totals;
  }, [stages, columns]);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const prev = JSON.parse(JSON.stringify(columns));
    const sourceCol = Array.from(columns[source.droppableId] || []);
    const destCol = Array.from(columns[destination.droppableId] || []);

    const [moved] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, moved);

    const nextColumns = {
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    };
    dispatch(setDealsColumns(nextColumns));

    try {
      const data = await updateStage(draggableId, destination.droppableId);
      // set active deal for inline editing
      handleEdit(data);
      setShowConfirmBox({ status: false, data: {} });
    } catch (error) {
      console.error("Failed to update stage:", error);
      dispatch(setDealsColumns(prev));
    }
  };
  const handleEdit = (deal) => {
    setIsEditOpen(true);
    setEditForm(deal);
  };
  const handleSave = () => {
    setIsEditOpen(null);
  };

  const handleCancel = () => {
    setIsEditOpen(false);
    setEditForm({});
  };

  const handleDragEnd = (result) => {
    const { destination } = result;

    if (
      destination.droppableId === "closed_won" ||
      destination.droppableId === "closed_lost"
    ) {
      setShowConfirmBox({ status: true, data: result });
    } else {
      onDragEnd(result);
    }
  };
  const confirmSave = async () => {
    onDragEnd(showConfirmBox.data);
  };

  if (isDealSubmitting) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading deals pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full border-inherit ">
      {/* Header */}
      <CommonHeader
        title={
          <span className="text-2xl font-bold text-gray-900">
            Deals Pipeline
          </span>
        }
        subTitle={
          <span className="text-gray-600">
            Manage and track your sales opportunities efficiently
          </span>
        }
      />

      {/* Filters Section */}
      <div className="bg-white shadow-sm rounded-xl p-4 mb-6 border  border-inherit">
        <div className="flex flex-wrap justify-between gap-4 items-center  border-inherit">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
            Total Deals:{" "}
            <span className="font-bold">
              {stages.reduce((acc, s) => acc + (columns[s]?.length || 0), 0)}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 items-center  border-inherit">
            {/* Date Filters */}
            <div className="flex gap-2  border-inherit">
              <CommonInput
                className="px-3 py-2 rounded-lg border"
                type="date"
                name="startDate"
                onChange={(e) => dispatch(setStartDate(e.target.value))}
                value={startDate}
              />
              <CommonInput
                className="px-3 py-2 rounded-lg border"
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => dispatch(setEndDate(e.target.value))}
              />
              {/* Select Filters */}
              <CommonSelect
                name="property"
                onChange={(e) => dispatch(setPropertyId(e.target.value))}
                options={properties?.map((pr) => ({
                  label: pr.title,
                  value: pr._id,
                }))}
              />
              <CommonSelect
                name="agents"
                onChange={(e) => dispatch(setAssignedTo(e.target.value))}
                options={agents?.map((ag) => ({
                  label: ag.userName,
                  value: ag._id,
                }))}
              />
            </div>

            {/* Value Filters */}
            <div className="flex gap-2 border-inherit">
              <CommonInput
                className="px-3 py-2 rounded-lg border"
                type="number"
                name="minValue"
                placeholder="Min ₹"
                onChange={(e) => dispatch(setMinValue(e.target.value))}
              />
              <CommonInput
                className="px-3 py-2 rounded-lg border"
                type="number"
                name="maxValue"
                placeholder="Max ₹"
                onChange={(e) => dispatch(setMaxValue(e.target.value))}
              />
            </div>

            {/* Reset Filters Button */}
            <CancelBtn
              onClick={() => dispatch(resetFilters())} // or dispatch(resetFilters())
            >
              Clear Filters
            </CancelBtn>
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex sm:justify-start gap-6 pb-10 border-inherit max-w-[70rem] overflow-auto ">
        <DragDropContext onDragEnd={handleDragEnd}>
          {stages.map((stageKey) => {
            const items = columns[stageKey] || [];
            const title = stageKey
              .replaceAll("_", " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <Droppable droppableId={stageKey} key={stageKey}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-xl border border-inherit bg-white p-4 min-w-[280px] max-w-[300px] min-h-[500px] shadow-sm transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? "bg-blue-50 border-blue-400 shadow-md"
                        : "hover:shadow-md"
                    }`}
                  >
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b ">
                      <h2 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                        {title}
                      </h2>
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        {items.length}
                      </span>
                    </div>

                    {/* Totals */}
                    <div className="mb-4 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                      <div className="text-xs text-green-700 font-medium">
                        Total Value
                      </div>
                      <div className="text-lg font-bold text-green-800">
                        ₹{(columnTotals[stageKey] || 0).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Deal Cards */}
                    <div className="space-y-3 text-start">
                      {items.map((deal, index) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          index={index}
                          handleEdit={handleEdit}
                        />
                      ))}
                    </div>

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
      <EditDealPopup
        isOpen={isEditOpen}
        onSave={handleSave}
        onClose={handleCancel}
        deal={editForm}
      />
      <ConfirmationBox
        isOpen={showConfirmBox.status}
        title="Confirm Stage Update"
        message={`Are you sure you want to move this deal to "${showConfirmBox.data?.destination?.droppableId?.replaceAll(
          "_",
          " "
        )}"?`}
        onConfirm={confirmSave}
        onCancel={() => setShowConfirmBox({ status: false, data: {} })}
      />
    </div>
  );
}
