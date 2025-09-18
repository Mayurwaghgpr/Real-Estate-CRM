import { toast } from "react-toastify";
import {
  setIsLoading,
  setIsSubmitting,
  setProperties,
  setProperty,
  setTotalPropertiesPage,
} from "../store/propertiesSlice";
import axiosInstance from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
function usePropertiesService() {
  const { properties, search, page, maxPrice, minPrice, statusFilter } =
    useSelector((state) => state.properties);
  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const fetchProperties = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(`/properties/p`, {
        params: {
          search,
          page,
          maxPrice,
          minPrice,
          statusFilter,
        },
      });
      dispatch(setProperties(response.data.properties));
      dispatch(setTotalPropertiesPage(response.data.totalPages));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const fetchAllProperties = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(`/properties/all`);
      dispatch(setProperties(response.data));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };
  const fetchArchivedProperties = async () => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.get(`/properties/archived/p`, {
        params: {
          search,
          page,
          maxPrice,
          minPrice,
          statusFilter,
        },
      });
      dispatch(setProperties(response.data.properties));
      dispatch(setTotalPropertiesPage(response.data.totalPages));
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const fetchPropertyById = async (id) => {
    try {
      const response = await axiosInstance.get(`/properties/property/${id}`);
      dispatch(setProperty(response.data));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const addNewProperty = async (formData) => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => {
          data.append("images", file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    dispatch(setIsSubmitting(true));

    try {
      const result = await axiosInstance.post(`/properties/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Property added successfully!");
      nevigate(-1);
      return result;
    } catch (error) {
      console.error(error);
      toast.error("Error occured while adding property");
      throw error;
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  const editProperty = async (id, formData) => {
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((img) => {
          if (typeof img === "string") {
            // If it's a URL, send it directly (as string, not file)

            data.append("existingImages", img);
          } else {
            // If it's a File, append for upload
            data.append("newImages", img);
          }
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    dispatch(setIsSubmitting(true));

    try {
      const result = await axiosInstance.put(`/properties/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Property updated successfully!");
      nevigate(-1);
      return result;
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating property");
      throw error;
    } finally {
      dispatch(setIsSubmitting(false));
    }
  };

  const toggleArchiveProperty = async (id, isArchived) => {
    try {
      const response = await axiosInstance.put(`/properties/archive/${id}`, {
        isArchived,
      });
      if (response.data.success) {
        const filteredProperties = properties.filter(
          (property) => property._id !== id
        );
        dispatch(setProperties(filteredProperties));

        toast.success(
          `Property ${isArchived ? "archived" : "unarchived"} successfully!`
        );
      }
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error(`Error occurred while archiving property`);
      throw error;
    }
  };
  const deleteProperty = async (id) => {
    try {
      const response = await axiosInstance.delete(`/properties/delete/${id}`);
      toast.success("Property deleted successfully!");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while deleting property");
      throw error;
    }
  };
  return {
    fetchProperties,
    addNewProperty,
    editProperty,
    fetchPropertyById,
    fetchArchivedProperties,
    toggleArchiveProperty,
    deleteProperty,
    fetchAllProperties,
  };
}

export default usePropertiesService;
