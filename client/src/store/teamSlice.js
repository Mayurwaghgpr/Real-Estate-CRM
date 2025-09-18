import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isUsersLoading: false,
  agents: [],
  page: 1,
  totalPages: 1,
  limit: 10,
  search: "",
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setIsUsersLoading: (state, action) => {
      state.isUsersLoading = action.payload;
    },
    setAgents: (state, action) => {
      state.agents = action.payload;
    },
    setTotalAgentPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  setIsUsersLoading,
  setAgents,
  setTotalAgentPages,
  setPage,
  setSearch,
} = teamSlice.actions;
export default teamSlice.reducer;
