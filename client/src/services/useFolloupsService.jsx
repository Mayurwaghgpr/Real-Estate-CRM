import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLeadFollowUps } from "../store/leadsSlice";
import { useNavigate } from "react-router";
import {
  resetFollowUpsForm,
  setFollowups,
  setFollowUpsAnalytic,
  setFollowupsTotalPage,
  setIsFollowupsLoading,
} from "../store/followupsSlice";

function useFolloupsService() {
  const page = useSelector((state) => state.followups.page);
  const followups = useSelector((state) => state.followups.followups);
  const status = useSelector((state) => state.followups.status);
  const assignedTo = useSelector((state) => state.followups.assignedTo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addFolloups = async (data) => {
    try {
      const result = await axiosInstance.post(`/folloups/add`, data);
      if (result.status == 201) {
        toast.success("folloups added successfuly");
        dispatch(resetFollowUpsForm());
        navigate(-1);
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add folloups");
      throw error;
    } finally {
    }
  };
  const fetchFollowups = async (id) => {
    dispatch(setIsFollowupsLoading(true));
    try {
      const result = await axiosInstance.get(`/folloups/p`, {
        params: {
          status,
          assignedTo,
          page,
        },
      });
      if (result.status == 200) {
        dispatch(setFollowups(result.data.followups));
        dispatch(setFollowupsTotalPage(result.data.totalPages));
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get lead folloups");
      throw error;
    } finally {
      dispatch(setIsFollowupsLoading(false));
    }
  };
  const fetchTodayFollowups = async () => {
    dispatch(setIsFollowupsLoading(true));
    try {
      const result = await axiosInstance.get(`/folloups/today`);
      if (result.status == 200) {
        dispatch(setFollowups(result.data.followups));
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get lead folloups");
      throw error;
    } finally {
      dispatch(setIsFollowupsLoading(false));
    }
  };
  const fetchUpcommingFollowups = async () => {
    dispatch(setIsFollowupsLoading(true));
    try {
      const result = await axiosInstance.get(`/folloups/upcomming`);
      if (result.status == 200) {
        dispatch(setFollowups(result.data));
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get lead folloups");
      throw error;
    } finally {
      dispatch(setIsFollowupsLoading(false));
    }
  };

  const getFolloupsByLeadId = async (id) => {
    try {
      const result = await axiosInstance.get(`/folloups/lead/${id}`);
      if (result.status == 200) {
        dispatch(setLeadFollowUps(result.data.followUps));
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get lead folloups");
      throw error;
    }
  };

  const deleteFolloups = async (id) => {
    try {
      const result = await axiosInstance.delete(`/folloups/${id}`);
      if (result.status == 200) {
        const filter = followups.filter((f) => f._id !== id);
        dispatch(setFollowups(filter));
        toast.success(result.data.message);
      }
      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete folloups");
      throw error;
    }
  };
  const updateFolloups = async ({ data, id }) => {
    try {
      const result = await axiosInstance.put(`/folloups/${id}`, data);
      if (result.status == 200) {
        toast.success("successfull update followups");
      }
      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to update followups");
      throw error;
    }
  };
  const fetchFollowupsAnalysis = async () => {
    dispatch(setIsFollowupsLoading(true));
    try {
      const result = await axiosInstance.get("/folloups/analytics");
      if (result.status == 200) {
        dispatch(setFollowUpsAnalytic(result.data));
      }
      return result.data;
    } catch (error) {
      toast.error("Failed to fetch analysis");
    } finally {
      dispatch(setIsFollowupsLoading(false));
    }
  };
  return {
    addFolloups,
    getFolloupsByLeadId,
    fetchFollowups,
    deleteFolloups,
    updateFolloups,
    fetchFollowupsAnalysis,
    fetchTodayFollowups,
    fetchUpcommingFollowups,
  };
}

export default useFolloupsService;
