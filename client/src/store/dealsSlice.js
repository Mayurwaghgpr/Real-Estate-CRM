import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDealSubmitting: false,
  columns: [],
  stages: [],
  columnTotals: {},
  deals: [],
  deal: null,
  search: "",
  assignedTo: "",
  propertyId: null,
  startDate: null,
  endDate: null,
  minValue: null,
  maxValue: null,
  isLoading: false,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setDealSubmitting: (state, action) => {
      state.isDealSubmitting = action.payload;
    },
    setDealsColumns: (state, action) => {
      state.columns = action.payload;
    },
    setDealsStages: (state, action) => {
      state.stages = action.payload;
    },
    setDealsTotals: (state, action) => {
      state.columnTotals = action.payload;
    },
    setDeals: (state, action) => {
      state.deals = action.payload;
    },
    setDeal: (state, action) => {
      state.deal = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setDealsSearch: (state, action) => {
      state.search = action.payload;
    },
    setAssignedTo: (state, action) => {
      state.assignedTo = action.payload;
    },
    setPropertyId: (state, action) => {
      state.propertyId = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setMinValue: (state, action) => {
      state.minValue = action.payload;
    },
    setMaxValue: (state, action) => {
      state.maxValue = action.payload;
    },
    resetFilters: (state) => {
      state.search = "";
      state.assignedTo = "";
      state.propertyId = null;
      state.startDate = null;
      state.endDate = null;
      state.minValue = null;
      state.maxValue = null;
    },
  },
});

export const {
  setDealSubmitting,
  setDealsColumns,
  setDealsStages,
  setDealsTotals,
  setDeals,
  setDeal,
  setIsLoading,
  setDealsSearch,
  setAssignedTo,
  setPropertyId,
  setStartDate,
  setEndDate,
  setMinValue,
  setMaxValue,
  resetFilters,
} = dealsSlice.actions;

export default dealsSlice.reducer;
