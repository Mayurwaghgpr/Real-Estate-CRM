import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./axiosInstance";
import {
  setIsLeadsLoading,
  setIsLeadSubmitting,
  setLeadData,
  setLeads,
  setLeadsTotalPages,
} from "../store/leadsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

function useLeadsService() {
  const { search, page, limit, leads } = useSelector((state) => state.leads);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchLeads = async () => {
    dispatch(setIsLeadsLoading(true));
    try {
      const result = await axiosInstance.get(`/leads/p`, {
        params: {
          search,
          page,
          limit,
        },
      });
      dispatch(setLeads(result.data.data));
      dispatch(setLeadsTotalPages(result.data.totalPages));
      return result.data;
    } catch (error) {
      console.error("error while fetching leads", error);
      throw error;
    } finally {
      dispatch(setIsLeadsLoading(false));
    }
  };
  const fetchLeadById = async (id) => {
    try {
      const result = await axiosInstance.get(`/leads/lead/${id}`);
      dispatch(setLeadData(result.data));
      return result.data;
    } catch (error) {
      console.error("error while fetching leads", error);
      throw error;
    }
  };
  const fetchDisposedLeads = async () => {
    dispatch(setIsLeadsLoading(true));

    try {
      const result = await axiosInstance.get(`/leads/disposed`, {
        params: {
          search,
          page,
          limit,
        },
      });
      dispatch(setLeads(result.data.data));
      dispatch(setLeadsTotalPages(result.data.totalPages));
      return result.data;
    } catch (error) {
      console.error("error while fetching leads", error);
      throw error;
    } finally {
      dispatch(setIsLeadsLoading(false));
    }
  };

  const addNewLeads = async (data) => {
    dispatch(setIsLeadsLoading(true));
    try {
      const result = await axiosInstance.post(`/leads/create`, data);
      if (result.status == 201) {
        toast.success("Leads Successfully added");
      }
      return result.data;
    } catch (error) {
      console.error("error while adding leads", error);
      toast.error("Failed to add leads");
      throw error;
    } finally {
      dispatch(setIsLeadsLoading(false));
    }
  };

  const editLead = async (data) => {
    dispatch(setIsLeadsLoading(true));
    try {
      const result = await axiosInstance.put(`/leads/update/${data._id}`, data);
      if (result.status == 201) {
        toast.success("Leads Successfully updated");
      }
      navigate(-1);
      return result.data;
    } catch (error) {
      console.error("error while updating leads", error);
      toast.error("Failed to updating leads");
      throw error;
    } finally {
      dispatch(setIsLeadsLoading(false));
    }
  };

  const toggelDisposeLead = async ({ id, isDispose }) => {
    try {
      const result = await axiosInstance.patch(`/leads/dispose/${id}`, {
        isDispose,
      });
      if (result.status == 200) {
        toast.success(
          `Successfully  ${isDispose ? "undisposed" : "disposed"} leads`
        );
      }
      const filtered = leads.filter((l) => l._id !== id);
      dispatch(setLeads(filtered));
      return result.data;
    } catch (error) {
      console.error("error while dispose leads", error);
      toast.error("Failed to dispose leads");
      throw error;
    }
  };

  const exportBulkLeads = async (type) => {
    // const url = `/leads/export/${type}`;
    try {
      const response = await axiosInstance.get("/leads/export/excel", {
        responseType: "blob",
      });
      // Convert response into a blob
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      // link.download = type === "csv" ? "leads.csv" : "leads.xlsx";
      link.download = "leads.xlsx";
      link.click();
    } catch (error) {
      console.error(error);
      toast.error("Error exporting leads");
    }
  };
  const importBulkLeads = async ({ type, file }) => {
    console.log({ type });
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    dispatch(setIsLeadSubmitting(true));
    try {
      const response = await axiosInstance.post(
        `/leads/import/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 201) {
        toast.success(` ${response.data.total} leads imported successfully`);
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading file");
    } finally {
      dispatch(setIsLeadSubmitting(false));
    }
  };
  return {
    addNewLeads,
    fetchLeads,
    toggelDisposeLead,
    fetchDisposedLeads,
    editLead,
    fetchLeadById,
    exportBulkLeads,
    importBulkLeads,
  };
}

export default useLeadsService;
