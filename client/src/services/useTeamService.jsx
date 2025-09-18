import React from "react";
import axiosInstance from "./axiosInstance";
import {
  setAgents,
  setIsUsersLoading,
  setTotalAgentPages,
  setPage,
  setSearch,
} from "../store/teamSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function useTeamService() {
  const dispatch = useDispatch();
  const { agent, isAllAgentLoading, page, limit, search, totalPages } =
    useSelector((state) => state.team);
  const fetchAgents = async () => {
    dispatch(setIsUsersLoading(true));
    try {
      const res = await axiosInstance.get("/user/agents", {
        params: { page, limit, search },
      });

      dispatch(setAgents(res.data.data));
      dispatch(setTotalAgentPages(res.data.totalPages));
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      dispatch(setIsUsersLoading(false));
    }
  };
  const fetchAllAgents = async () => {
    dispatch(setIsUsersLoading(true));
    try {
      const res = await axiosInstance.get("/user/agents/all");
      dispatch(setAgents(res.data.data));
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      dispatch(setIsUsersLoading(false));
    }
  };
  const addNewUser = async (data) => {
    try {
      const res = await axiosInstance.post("/auth/register/user", data);
      if (res.status == 201) {
        toast.success("Successfuly added new user ");
      }
      return res.data;
    } catch (error) {
      toast.error("Error fetching agents:");
      console.error("Error fetching agents:", error);
      throw error;
    }
  };
  return { fetchAllAgents, fetchAgents, addNewUser };
}

export default useTeamService;
