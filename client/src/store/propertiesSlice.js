import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  properties: [],
  property: {},
  page: 1,
  limit: 10,
  search: "",
  totalPropertiesPage: 1,
  minPrice: null,
  maxPrice: null,
  statusFilter: "available",
  isLoading: false,
  //   sortBy = "createdAt",
  //   sortOrder = "desc",
  isSubmitting: false,
};
const propertiesSlice = createSlice({
  name: "properties",
  initialState,

  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setProperty: (state, action) => {
      state.property = action.payload;
    },
    setPropertiesPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPropertiesPage: (state, action) => {
      state.totalPropertiesPage = action.payload;
    },
    setPropertiesSearch: (state, action) => {
      state.search = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setPropertiesMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setPropertiesMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setProperties,
  setProperty,
  setPropertiesPage,
  setTotalPropertiesPage,
  setPropertiesSearch,
  setStatusFilter,
  setPropertiesMinPrice,
  setPropertiesMaxPrice,
  setIsSubmitting,
  setIsLoading,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
